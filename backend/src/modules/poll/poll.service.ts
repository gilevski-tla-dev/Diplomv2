import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Answer } from './entities/answer.entity';
import { Poll } from './entities/poll.entity';
import { Question } from './entities/question.entity';
import { CreatePollDto } from './dto/create-poll.dto';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollRepository: Repository<Poll>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPoll(
    telegramId: number,
    createPollDto: CreatePollDto,
  ): Promise<Poll> {
    // Находим пользователя по telegramId
    const user = await this.userRepository.findOne({ where: { telegramId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const poll = new Poll();
    poll.title = createPollDto.title;
    poll.description = createPollDto.description;
    poll.owner = user;

    const questions = await Promise.all(
      createPollDto.questions.map(async (questionDto) => {
        const question = new Question();
        question.text = questionDto.text;
        question.type = questionDto.type;
        question.correctAnswer = JSON.stringify(questionDto.correctAnswer);

        const answers = questionDto.options.map((option) => {
          const answer = new Answer();
          answer.text = option;
          return answer;
        });

        question.answers = await Promise.all(
          answers.map((answer) => this.answerRepository.save(answer)),
        );

        return question;
      }),
    );

    poll.questions = questions;
    return this.pollRepository.save(poll);
  }
}
