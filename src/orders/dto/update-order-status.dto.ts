import { IsString, IsIn } from 'class-validator';
import { OrderStatus } from '../order-status.enum';

export class UpdateOrderStatusDto {
  @IsString()
  @IsIn(Object.values(OrderStatus))
  status: OrderStatus;
}
