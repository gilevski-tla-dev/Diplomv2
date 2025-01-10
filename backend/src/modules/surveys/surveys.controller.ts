import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../auth/entities/user.entity';

@Controller('surveys')
@UseGuards(JwtAuthGuard)
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  async create(@Body() createSurveyDto: CreateSurveyDto, @Req() req: Request) {
    const user = req.user as User;
    return await this.surveysService.create(createSurveyDto, user);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const user = req.user as User;
    return await this.surveysService.findAllByOwner(user);
  }
}
