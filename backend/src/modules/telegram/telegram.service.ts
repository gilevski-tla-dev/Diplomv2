import { Injectable, ForbiddenException, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { TelegramQuery } from './interfaces/query.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly botToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    // Получаем токен из переменных окружения
    this.botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
  }

  validateQueryParams(query: TelegramQuery) {
    if (!query.hash || !query.auth_date) {
      this.logger.error('Missing required parameters');
      throw new ForbiddenException(
        'Access Denied: Missing required parameters',
      );
    }
  }

  validateHash(query: TelegramQuery) {
    const dataCheckString = Object.keys(query)
      .filter((key) => key !== 'hash')
      .sort()
      .map((key) => `${key}=${query[key]}`)
      .join('\n');
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(this.botToken)
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

  validateAuthDate(authDate: string) {
    const now = Math.floor(Date.now() / 1000);
    const authDateInt = parseInt(authDate, 10);
    if (now - authDateInt > 86400) {
      this.logger.warn('Request expired');
      throw new ForbiddenException('Access Denied: Request expired');
    }
  }

  parseUserData(userData: string): CreateUserDto {
    if (!userData) {
      this.logger.error('User data is missing or empty');
      throw new ForbiddenException('Access Denied: Missing user data');
    }
    try {
      // Декодируем URL-encoded строку
      const decodedUserData = decodeURIComponent(userData);
      // Парсим JSON
      const user = JSON.parse(decodedUserData);
      // Возвращаем объект с telegramId и остальными данными
      return {
        telegramId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        languageCode: user.language_code,
        allowsWriteToPm: user.allows_write_to_pm,
        photoUrl: user.photo_url,
      };
    } catch (error) {
      this.logger.error('Error parsing user data', error.message);
      throw new ForbiddenException('Access Denied: Invalid user data');
    }
  }

  async processUser(user: CreateUserDto) {
    try {
      const existingUser = await this.userService.findUserByTelegramId(
        user.telegramId,
      );
      if (existingUser) {
        this.logger.log(
          `User with telegramId ${user.telegramId} already exists`,
        );
        return {
          success: true,
          message: 'User already exists',
          username: existingUser.username,
          tgId: existingUser.telegramId,
        };
      }
      await this.userService.createUser(user);
      this.logger.log(
        `User with telegramId ${user.telegramId} created successfully`,
      );
      return {
        success: true,
        message: 'User created successfully',
        username: user.username,
        tgId: user.telegramId,
      };
    } catch (error) {
      this.logger.error('Error processing user', error.message);
      throw new ForbiddenException(error.message || 'An error occurred');
    }
  }
}
