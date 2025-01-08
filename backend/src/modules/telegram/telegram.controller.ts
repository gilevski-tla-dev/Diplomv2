import {
  Controller,
  Post,
  Query,
  BadRequestException,
  ForbiddenException,
  Logger,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { UserService } from '../user/user.service';

@Controller('telegram')
export class TelegramController {
  private readonly logger = new Logger(TelegramController.name);

  constructor(private readonly userService: UserService) {}

  @Post('init')
  @HttpCode(HttpStatus.CREATED) // Устанавливаем статус 201 для успешного создания
  async initData(@Query() query: any) {
    const botToken = '5821534037:AAGGxevje9-Qlf4PSh6TeIjPWFiEWzrrXC0';

    // Проверяем наличие обязательных параметров
    this.validateQueryParams(query);

    // Проверяем корректность хэша
    this.validateHash(query, botToken);

    // Проверяем срок действия данных
    this.validateAuthDate(query.auth_date);

    // Разбираем данные пользователя
    const user = query.user ? JSON.parse(query.user) : null;

    if (!user?.first_name) {
      throw new ForbiddenException('Access Denied: Invalid user data');
    }

    // Логирование данных пользователя
    this.logger.log(`User data: ${JSON.stringify(user)}`);

    // Обрабатываем пользователя
    return await this.processUser(user);
  }

  private validateQueryParams(query: any) {
    if (!query.hash || !query.auth_date) {
      this.logger.error('Missing required parameters');
      throw new ForbiddenException(
        'Access Denied: Missing required parameters',
      );
    }
  }

  private validateHash(query: any, botToken: string) {
    const dataCheckString = Object.keys(query)
      .filter((key) => key !== 'hash')
      .sort()
      .map((key) => `${key}=${query[key]}`)
      .join('\n');

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (computedHash !== query.hash) {
      this.logger.error('Invalid hash');
      throw new ForbiddenException('Access Denied: Invalid hash');
    }
  }

  private validateAuthDate(authDate: string) {
    const now = Math.floor(Date.now() / 1000);
    const authDateInt = parseInt(authDate, 10);

    if (now - authDateInt > 86400) {
      this.logger.warn('Request expired');
      throw new ForbiddenException('Access Denied: Request expired');
    }
  }

  private async processUser(user: any) {
    try {
      const existingUser = await this.userService.findUserByTelegramId(user.id);
      if (existingUser) {
        this.logger.log(`User with id ${user.id} already exists`);
        // Если пользователь существует, возвращаем данные с кодом 200
        return {
          success: true,
          message: 'User already exists',
          username: existingUser.username,
          tgId: existingUser.telegramId,
        };
      }

      // Создаем нового пользователя
      await this.userService.createUser({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        language_code: user.language_code,
        allows_write_to_pm: user.allows_write_to_pm,
        photo_url: user.photo_url,
      });

      this.logger.log(`User with id ${user.id} created successfully`);
      // Возвращаем данные с кодом 201
      return {
        success: true,
        message: 'User created successfully',
        username: user.username,
        tgId: user.id,
      };
    } catch (error) {
      this.logger.error('Error processing user', error.stack);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }
}
