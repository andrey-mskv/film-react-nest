import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // Для автоматической трансформации типов в DTO
  app.setGlobalPrefix('api/afisha'); // Устанавливаем глобальный префикс для всех маршрутов
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
