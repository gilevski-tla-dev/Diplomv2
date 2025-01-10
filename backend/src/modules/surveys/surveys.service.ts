import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto, owner: User): Promise<Survey> {
    const survey = this.surveyRepository.create({
      ...createSurveyDto,
      owner,
    });
    return await this.surveyRepository.save(survey);
  }

  async findAllByOwner(owner: User): Promise<Survey[]> {
    return await this.surveyRepository.find({
      where: { owner },
      relations: ['questions', 'questions.options'],
    });
  }
}
