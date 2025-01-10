import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { AnswerOption } from './entities/answer-option';
import { Question } from './entities/question';
import { Survey } from './entities/survey';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question, AnswerOption])],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}

// TODO: Доделать модуль опросов
