// telegram/telegram.controller.ts
import { Controller, Post, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { AuthService } from '../auth/auth.service';

@Controller('telegram')
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly authService: AuthService,
  ) {}

  @Post('init')
  @HttpCode(HttpStatus.CREATED)
  async initData(@Query() query: any) {
    this.telegramService.validateQueryParams(query);
    this.telegramService.validateHash(query);
    this.telegramService.validateAuthDate(query.auth_date);

    const user = this.telegramService.parseUserData(query.user);
    const processedUser = await this.telegramService.processUser(user);

    // Генерация JWT токена
    const token = await this.authService.generateJwtToken(user);

    return {
      ...processedUser,
      ...token,
    };
  }
}
