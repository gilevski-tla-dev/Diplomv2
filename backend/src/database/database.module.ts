import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../modules/user/entities/user.entity';
import { Poll } from '../modules/poll/entities/poll.entity';
import { Question } from '../modules/poll/entities/question.entity';
import { Answer } from '../modules/poll/entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Poll, Question, Answer], // Явно указываем все сущности
        migrations: ['dist/migrations/*.js'], // Путь к скомпилированным миграциям
        migrationsRun: true, // Автоматически применять миграции при запуске
        synchronize: true, // Отключаем автоматическую синхронизацию
      }),
    }),
    TypeOrmModule.forFeature([User, Poll, Question, Answer]), // Регистрируем сущности
  ],
})
export class DatabaseModule {}
