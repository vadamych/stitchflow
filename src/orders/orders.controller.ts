import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/role.enum';
import { AuthenticatedRequest } from '../auth/authenticated-request.interface';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles(Role.CLIENT)
  create(@Body() dto: CreateOrderDto, @Req() req: AuthenticatedRequest) {
    return this.ordersService.create(req.user.userId, dto.garmentType, dto.isUrgent);
  }

  @Get()
  @Roles(Role.ADMIN, Role.DESIGNER, Role.MANAGER, Role.WAREHOUSE_WORKER, Role.CLIENT)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.DESIGNER, Role.MANAGER, Role.WAREHOUSE_WORKER, Role.CLIENT)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN, Role.DESIGNER, Role.MANAGER, Role.WAREHOUSE_WORKER, Role.CLIENT)
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, dto.status);
  }
}
