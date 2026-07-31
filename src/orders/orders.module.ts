import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderModel } from './order.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderModel])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
