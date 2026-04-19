import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { getLogger } from './loggers/logger.factory';

console.log('проверяем DB NAME:', process.env.DATABASE_NAME);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // Для автоматической трансформации типов в DTO
  app.setGlobalPrefix('api/afisha', {
    exclude: ['/health'],
  });
  app.enableCors();
  app.useLogger(getLogger(app));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
