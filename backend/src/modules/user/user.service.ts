import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByTelegramId(telegramId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { telegramId } });
  }

  async createUser(userData: any): Promise<User> {
    const user = this.userRepository.create({
      telegramId: userData.id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      username: userData.username,
      languageCode: userData.language_code,
      allowsWriteToPm: userData.allows_write_to_pm,
      photoUrl: userData.photo_url,
    });

    return await this.userRepository.save(user);
  }
}
