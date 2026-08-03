import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { Role } from './users/role.enum';

const SALT_ROUNDS = 10;

async function seed() {
  // поднимаем DI-контейнер БЕЗ HTTP-сервера
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const email = 'admin@stitchflow.com';
  const existing = await usersService.findByEmail(email);

  if (existing) {
    console.log(`Пользователь ${email} уже существует, пропускаем создание.`);
  } else {
    const passwordHash = await bcrypt.hash('admin12345', SALT_ROUNDS);
    const admin = await usersService.create('Главный Админ', email, passwordHash, Role.ADMIN);
    console.log('Создан первый ADMIN:', { id: admin.id, email: admin.email, role: admin.role });
  }

  await app.close(); // важно закрыть контекст, иначе процесс не завершится сам
}

seed().catch((err) => {
  console.error('Ошибка при сидинге:', err);
  process.exit(1);
});
