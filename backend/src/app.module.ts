import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { SurveysModule } from './modules/surveys/surveys.module';

@Module({
  imports: [DatabaseModule, UserModule, TelegramModule, SurveysModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
