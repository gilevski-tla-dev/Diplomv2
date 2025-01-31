import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule {}
