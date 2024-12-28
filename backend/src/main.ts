import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT;
  await app.listen(port);

  console.log(`http://localhost:${port}`);
}
bootstrap();
