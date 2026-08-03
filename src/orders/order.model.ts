import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { OrderStatus } from './order-status.enum';
import { UserModel } from '../users/user.model';

@Table({ tableName: 'orders', timestamps: true })
export class OrderModel extends Model {
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  clientId: number;

  @BelongsTo(() => UserModel)
  client: UserModel;

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
