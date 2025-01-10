import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateAnswerOptionDto {
  @IsString()
  text: string;
}

class CreateQuestionDto {
  @IsString()
  text: string;

  @IsString()
  type: 'single' | 'multiple' | 'text';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerOptionDto)
  options: CreateAnswerOptionDto[];
}

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
