import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/shared/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwtToken(user: User): { access_token: string } {
    const payload = { sub: user.telegramId, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
