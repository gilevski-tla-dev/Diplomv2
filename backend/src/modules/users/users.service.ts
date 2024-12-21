import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveUser(data: Partial<User>): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { telegram_id: data.telegram_id },
    });

    if (!user) {
      user = this.userRepository.create(data);
    } else {
      Object.assign(user, data);
    }

    return this.userRepository.save(user);
  }
}
