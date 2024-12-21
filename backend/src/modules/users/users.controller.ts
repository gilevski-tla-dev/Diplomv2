import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: any): Promise<User> {
    if (!userData.telegram_id) {
      throw new BadRequestException('Telegram ID is required');
    }

    // Прямо сохраняем данные пользователя в базе данных
    const user = await this.usersService.saveUser(userData);

    // Возвращаем сохраненного пользователя
    return user;
  }
}
