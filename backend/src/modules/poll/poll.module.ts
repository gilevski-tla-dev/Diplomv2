import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { Poll } from './entities/poll.entity';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poll, Question, Answer, User])],
  controllers: [PollController],
  providers: [PollService],
})
export class PollModule {}
