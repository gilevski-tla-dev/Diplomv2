import { Controller, Post, Query, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserService } from '../user/user.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly userService: UserService) {}

  @Post('init')
  async initData(@Query() query: any) {
    const botToken = '5821534037:AAGGxevje9-Qlf4PSh6TeIjPWFiEWzrrXC0';

    if (!query.hash || !query.auth_date) {
      throw new BadRequestException('Missing required parameters');
    }

    // Формирование строки для проверки
    const dataCheckString = Object.keys(query)
      .filter((key) => key !== 'hash')
      .sort()
      .map((key) => `${key}=${query[key]}`)
      .join('\n');

    // Генерация секретного ключа
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    // Вычисление хэша
    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    // Проверка хэша
    if (computedHash !== query.hash) {
      throw new BadRequestException('Invalid hash');
    }

    // Проверка устаревания данных
    const now = Math.floor(Date.now() / 1000);
    const authDate = parseInt(query.auth_date, 10);
    if (now - authDate > 86400) {
      throw new BadRequestException('Request expired');
    }

    // Разбор данных пользователя
    const user = query.user ? JSON.parse(query.user) : null;

    if (!user || !user.first_name) {
      throw new BadRequestException(
        'Invalid user data: first_name is required',
      );
    }

    try {
      // Проверяем, существует ли пользователь
      const existingUser = await this.userService.findUserByTelegramId(user.id);
      if (existingUser) {
        return { success: true, message: 'User already exists' };
      }

      // Создаём нового пользователя
      await this.userService.createUser({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        language_code: user.language_code,
        allows_write_to_pm: user.allows_write_to_pm,
        photo_url: user.photo_url,
      });

      return { success: true, message: 'User created successfully' };
    } catch (error) {
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }
}
