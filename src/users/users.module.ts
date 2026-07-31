import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
