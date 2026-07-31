import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from './order.model';
import { OrderStatus } from './order-status.enum';
import { ALLOWED_TRANSITIONS } from './order-transitions';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderModel)
    private readonly orderModel: typeof OrderModel,
  ) {}

  async create(clientName: string, garmentType: string, isUrgent: boolean): Promise<OrderModel> {
    return this.orderModel.create({
      clientName,
      garmentType,
      isUrgent,
      status: OrderStatus.NEW,
    });
  }

  async findAll(): Promise<OrderModel[]> {
    return this.orderModel.findAll();
  }

  async findOne(id: number): Promise<OrderModel> {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async updateStatus(id: number, newStatus: OrderStatus): Promise<OrderModel> {
    const order = await this.findOne(id);
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
