import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { getLogger } from './loggers/logger.factory';

console.log('Проверка DB NAME:', process.env.DATABASE_NAME);
console.log('Проверка в main DB DRIVER:', process.env.DATABASE_DRIVER);

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
