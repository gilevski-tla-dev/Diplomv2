import { Controller, Post, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TelegramService } from './telegram.service';
import { AuthService } from '../auth/auth.service';
import { TelegramQuery } from './interfaces/query.interface';

@ApiTags('Telegram')
@Controller('telegram')
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly authService: AuthService,
  ) {}

  @Post('init')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Инициализация данных Telegram' }) // Описание метода
  @ApiQuery({
    name: 'auth_date',
    required: true,
    description: 'Дата авторизации в Telegram',
  })
  @ApiQuery({
    name: 'hash',
    required: true,
    description: 'Хэш для валидации данных',
  })
  @ApiQuery({
    name: 'user',
    required: true,
    description: 'JSON строка с данными пользователя',
  })
  @ApiResponse({
    status: 201,
    description: 'Успешная инициализация',
    schema: {
      example: {
        success: true,
        message: 'User processed successfully',
        username: 'telegram_user',
        tgId: 123456789,
        access_token: 'eyJhbGciOiJIUzI1...',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Ошибка валидации данных' })
  async initData(@Query() query: TelegramQuery): Promise<{
    success: boolean;
    message: string;
    username?: string;
    tgId?: number;
    access_token: string;
  }> {
    this.telegramService.validateQueryParams(query);
    this.telegramService.validateHash(query);
    this.telegramService.validateAuthDate(query.auth_date);

    const user = this.telegramService.parseUserData(query.user);
    const processedUser = await this.telegramService.processUser(user);

    const token = await this.authService.generateJwtToken(user);

    return {
      ...processedUser,
      ...token,
    };
  }
}
