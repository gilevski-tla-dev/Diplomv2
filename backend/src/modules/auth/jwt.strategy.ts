import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлекаем токен из заголовка Authorization
      ignoreExpiration: false, // Проверяем срок действия токена
      secretOrKey: 'your_jwt_secret_key', // Секретный ключ для проверки подписи
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findUserByTelegramId(payload.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user; // Возвращаем пользователя для использования в запросах
  }
}
