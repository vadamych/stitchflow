import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет поля, не описанные в DTO
      forbidNonWhitelisted: true, // кидает 400, если пришли ЛИШНИЕ поля
      transform: true, // автоматически приводит типы (например, "5" → 5)
    }),
  );
  await app.listen(3000);
  console.log('StitchFlow API запущен на http://localhost:3000');
}
bootstrap();
