import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByTelegramId(telegramId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { telegramId } });
  }

  async createUser(userData: any): Promise<User> {
    this.validateUserData(userData);

    // Проверяем, что пользователь не существует
    await this.ensureUserDoesNotExist(userData.id);

    // Создаём нового пользователя
    const user = this.userRepository.create({
      telegramId: userData.id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      username: userData.username,
      languageCode: userData.language_code,
      allowsWriteToPm: userData.allows_write_to_pm,
      photoUrl: userData.photo_url,
    });

    return await this.saveUser(user);
  }

  private validateUserData(userData: any) {
    if (!userData.id || !userData.first_name) {
      this.logger.error('Required user data is missing');
      throw new Error('Required user data is missing');
    }
  }

  private async ensureUserDoesNotExist(telegramId: number) {
    const existingUser = await this.findUserByTelegramId(telegramId);
    if (existingUser) {
      this.logger.error(`User with telegramId ${telegramId} already exists`);
      throw new Error('User already exists');
    }
  }

  private async saveUser(user: User): Promise<User> {
    try {
      this.logger.log(`Saving user with telegramId ${user.telegramId}`);
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error('Error saving user', error.stack);
      throw new Error('Failed to save user');
    }
  }
}
