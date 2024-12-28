import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Метод для поиска пользователя по telegramId
  async findUserByTelegramId(telegramId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { telegramId } });
  }

  // Метод для создания нового пользователя
  async createUser(userData: any): Promise<User> {
    console.log('Received user data:', userData); // Логирование входных данных

    // Проверка на наличие обязательных полей
    if (!userData.id || !userData.first_name) {
      throw new Error('Required user data is missing');
    }

    // Проверка, что пользователь с таким telegramId не существует
    const existingUser = await this.findUserByTelegramId(userData.id);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Создаем нового пользователя
    const user = this.userRepository.create({
      telegramId: userData.id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      username: userData.username,
      languageCode: userData.language_code,
      allowsWriteToPm: userData.allows_write_to_pm,
      photoUrl: userData.photo_url,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error('Failed to save user');
    }
  }
}
