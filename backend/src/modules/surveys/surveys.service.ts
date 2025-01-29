import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async createSurvey(surveyData: any): Promise<Survey> {
    const { title, description, questions } = surveyData;

    if (!title || !Array.isArray(questions) || questions.length === 0) {
      throw new BadRequestException('Некорректные данные опроса.');
    }

    // Создаем опрос
    const survey = this.surveyRepository.create({ title, description });

    // Создаем вопросы
    const createdQuestions = questions.map((questionData) => {
      const { type, text, options } = questionData;

      if (!type || !text) {
        throw new BadRequestException('Некорректные данные вопроса.');
      }

      if (
        (type === 'single_choice' || type === 'multiple_choice') &&
        (!options || options.length === 0)
      ) {
        throw new BadRequestException(
          'Для вопросов с выбором нужны варианты ответа.',
        );
      }

      return this.questionRepository.create({ type, text, options });
    });

    // Связываем вопросы с опросом
    survey.questions = createdQuestions;

    // Сохраняем опрос (вопросы сохранятся автоматически благодаря cascade: true)
    return await this.surveyRepository.save(survey);
  }
}
