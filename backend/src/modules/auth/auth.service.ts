import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(user: any): Promise<string> {
    const payload = { userId: user.telegramId }; // Добавляем данные пользователя в токен
    return this.jwtService.sign(payload); // Генерируем JWT
  }

  async processUser(userData: any) {
    let user = await this.userService.findUserByTelegramId(userData.id);

    if (!user) {
      user = await this.userService.createUser({
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        language_code: userData.language_code,
        allows_write_to_pm: userData.allows_write_to_pm,
        photo_url: userData.photo_url,
      });
    }

    return user;
  }
}
