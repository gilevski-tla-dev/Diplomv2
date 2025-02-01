import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class TelegramInitDto {
  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsString()
  @IsNotEmpty()
  auth_date: string;

  @IsString()
  @IsOptional()
  user: string;
}
