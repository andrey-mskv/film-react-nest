import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe, ConsoleLogger } from '@nestjs/common';
import { getLogger } from './loggers/logger.factory';

async function bootstrap() {
const app = await NestFactory.create(AppModule, {
  bufferLogs: true,
});
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // Для автоматической трансформации типов в DTO
  app.setGlobalPrefix('api/afisha'); // Устанавливаем глобальный префикс для всех маршрутов
  app.enableCors();
  app.useLogger(getLogger(app));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
