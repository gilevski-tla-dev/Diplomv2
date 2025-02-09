import { IsString, IsNotEmpty, IsEnum, IsArray } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TEXT'])
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TEXT';

  @IsArray()
  options: string[]; // Варианты ответов для SINGLE_CHOICE и MULTIPLE_CHOICE

  @IsArray()
  correctAnswer: string[]; // Правильные ответы
}
