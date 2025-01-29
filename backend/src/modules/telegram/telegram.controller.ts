import { Controller, Post, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { AuthService } from '../auth/auth.service';

@Controller('telegram')
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly authService: AuthService, // Внедряем AuthService
  ) {}

  @Post('init')
  @HttpCode(HttpStatus.CREATED)
  async initData(@Query() query: any) {
    // Проверяем параметры запроса
    this.telegramService.validateQueryParams(query);

    // Проверяем корректность хэша
    this.telegramService.validateHash(query);

    // Проверяем срок действия данных
    this.telegramService.validateAuthDate(query.auth_date);

    // Парсим данные пользователя
    const user = this.telegramService.parseUserData(query.user);

    // Логиним пользователя или создаем нового
    const existingUser = await this.authService.processUser(user);

    // Генерируем JWT с помощью AuthService
    const token = await this.authService.generateToken(existingUser);

    return {
      success: true,
      message: 'User authenticated successfully',
      token,
    };
  }
}
