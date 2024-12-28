import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TelegramController],
})
export class TelegramModule {}
