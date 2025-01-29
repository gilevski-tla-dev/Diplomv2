import { Controller, Post, Body } from '@nestjs/common';
import { SurveyService } from './surveys.service';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async createSurvey(@Body() surveyData: any) {
    // Убираем зависимость от пользователя и передаем только данные опроса
    return this.surveyService.createSurvey(surveyData);
  }
}
