import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserByTelegramId(telegramId: number): Promise<User | null> {
    return this.userRepository.findOneBy({ telegramId });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      telegramId: createUserDto.telegramId,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName || null,
      username: createUserDto.username || null,
      languageCode: createUserDto.languageCode || null,
      allowsWriteToPm: createUserDto.allowsWriteToPm || true,
      photoUrl: createUserDto.photoUrl || null,
    });
    return this.userRepository.save(user);
  }
}
