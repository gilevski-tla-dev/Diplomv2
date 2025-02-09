import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPoll(@Req() req, @Body() createPollDto: CreatePollDto) {
    const telegramId = req.user.telegramId; // Получаем telegramId авторизованного пользователя
    return this.pollService.createPoll(telegramId, createPollDto);
  }
}
