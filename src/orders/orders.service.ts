import { Injectable, NotFoundException } from '@nestjs/common';

export interface Order {
  id: number;
  clientName: string;
  garmentType: string;
  status: string;
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
      status: 'NEW',
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

  // TODO (задание): реализуй updateStatus(id, newStatus), переиспользуя findOne
}
