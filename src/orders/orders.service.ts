import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from './order.model';
import { OrderStatus } from './order-status.enum';
import { ALLOWED_TRANSITIONS } from './order-transitions';
import { Role } from '../users/role.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderModel)
    private readonly orderModel: typeof OrderModel,
  ) {}

  async create(clientId: number, garmentType: string, isUrgent: boolean): Promise<OrderModel> {
    return this.orderModel.create({
      clientId,
      garmentType,
      isUrgent,
      status: OrderStatus.NEW,
    });
  }

  async findAll(clientId: number, role: Role): Promise<OrderModel[]> {
    const whereClause = role === Role.CLIENT ? { clientId } : {};
    return this.orderModel.findAll({ where: whereClause });
  }

  async findOne(clientId: number, role: Role, id: number): Promise<OrderModel> {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    if (role === Role.CLIENT && clientId !== order.clientId) {
      throw new ForbiddenException('This order does not belong to you');
    }
    return order;
  }

  async updateStatus(clientId: number, role: Role, id: number, newStatus: OrderStatus): Promise<OrderModel> {
    const order = await this.findOne(clientId, role, id);
    if (!this.canTransition(order.status, newStatus)) {
      throw new BadRequestException(`Cannot transition from ${order.status} to ${newStatus}`);
    }
    order.status = newStatus;
    await order.save();
    return order;
  }

  canTransition(from: OrderStatus, to: OrderStatus): boolean {
    return ALLOWED_TRANSITIONS[from].includes(to);
  }
}
