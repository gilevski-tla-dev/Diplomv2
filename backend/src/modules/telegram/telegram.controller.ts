import { Controller, Post, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('init')
  @HttpCode(HttpStatus.CREATED)
  async initData(@Query() query: any) {
    this.telegramService.validateQueryParams(query);
    this.telegramService.validateHash(query);
    this.telegramService.validateAuthDate(query.auth_date);

    const user = this.telegramService.parseUserData(query.user);
    return await this.telegramService.processUser(user);
  }
}
