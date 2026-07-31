import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { OrderStatus } from './order-status.enum';

@Table({ tableName: 'orders', timestamps: true })
export class OrderModel extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  clientName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  garmentType: string;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    allowNull: false,
    defaultValue: OrderStatus.NEW,
  })
  status: OrderStatus;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isUrgent: boolean;
}
