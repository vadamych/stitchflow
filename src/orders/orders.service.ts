import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus } from './order-status.enum';
import { ALLOWED_TRANSITIONS } from './order-transitions';

export interface Order {
  id: number;
  clientName: string;
  garmentType: string;
  status: OrderStatus;
  isUrgent: boolean;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = []; // пока в памяти, позже заменим на Postgres
  private idCounter = 1;

  create(clientName: string, garmentType: string, isUrgent: boolean): Order {
    const order: Order = {
      id: this.idCounter++,
      clientName,
      garmentType,
      status: OrderStatus.NEW,
      isUrgent,
    };
    this.orders.push(order);
    return order;
  }

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: number): Order {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  updateStatus(id: number, newStatus: OrderStatus): Order {
    const order = this.findOne(id);
    if (!this.canTransition(order.status, newStatus)) {
      throw new BadRequestException(`Cannot transition from ${order.status} to ${newStatus}`);
    }
    order.status = newStatus; // мутируем объект прямо в массиве
    return order;
  }

  canTransition(from: OrderStatus, to: OrderStatus): boolean {
    return ALLOWED_TRANSITIONS[from].includes(to);
  }
}
