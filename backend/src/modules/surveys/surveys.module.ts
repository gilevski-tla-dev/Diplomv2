import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';
import { SurveyController } from './surveys.controller';
import { SurveyService } from './surveys.service';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question])],
  providers: [SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
