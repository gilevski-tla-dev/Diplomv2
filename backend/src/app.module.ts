import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { SurveyModule } from './modules/surveys/surveys.module';

@Module({
  imports: [DatabaseModule, UserModule, TelegramModule, SurveyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
