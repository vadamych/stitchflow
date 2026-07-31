import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { Role } from './role.enum';

@Table({ tableName: 'users', timestamps: true })
export class UserModel extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  passwordHash: string;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    allowNull: false,
    defaultValue: Role.CLIENT,
  })
  role: Role;
}
