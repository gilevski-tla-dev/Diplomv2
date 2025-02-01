import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  telegramId: number;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  languageCode?: string;

  @IsOptional()
  allowsWriteToPm?: boolean;

  @IsString()
  @IsOptional()
  photoUrl?: string;
}
