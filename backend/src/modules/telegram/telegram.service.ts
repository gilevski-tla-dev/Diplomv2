import { Injectable, ForbiddenException, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserService } from '../user/user.service';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly botToken = '5821534037:AAGGxevje9-Qlf4PSh6TeIjPWFiEWzrrXC0';

  constructor(private readonly userService: UserService) {}

  validateQueryParams(query: any) {
    if (!query.hash || !query.auth_date) {
      this.logger.error('Missing required parameters');
      throw new ForbiddenException(
        'Access Denied: Missing required parameters',
      );
    }
  }

  validateHash(query: any) {
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

  parseUserData(userData: string) {
    try {
      const user = userData ? JSON.parse(userData) : null;
      if (!user?.first_name) {
        throw new ForbiddenException('Access Denied: Invalid user data');
      }
      return user;
    } catch (error) {
      this.logger.error('Error parsing user data', error.stack);
      throw new ForbiddenException('Access Denied: Invalid user data');
    }
  }

  async processUser(user: any) {
    try {
      const existingUser = await this.userService.findUserByTelegramId(user.id);

      if (existingUser) {
        this.logger.log(`User with id ${user.id} already exists`);
        return {
          success: true,
          message: 'User already exists',
          username: existingUser.username,
          tgId: existingUser.telegramId,
        };
      }

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
      return {
        success: true,
        message: 'User created successfully',
        username: user.username,
        tgId: user.id,
      };
    } catch (error) {
      this.logger.error('Error processing user', error.stack);
      throw new ForbiddenException(error.message || 'An error occurred');
    }
  }
}
