import { OrderStatus } from './order-status.enum';

type TransitionMap = Record<OrderStatus, OrderStatus[]>;

export const ALLOWED_TRANSITIONS: TransitionMap = {
  NEW: [OrderStatus.PENDING_DESIGNER_ASSIGNMENT],
  PENDING_DESIGNER_ASSIGNMENT: [OrderStatus.IN_DESIGN],
  IN_DESIGN: [OrderStatus.PENDING_MANAGER_REVIEW],
  PENDING_MANAGER_REVIEW: [OrderStatus.IN_DESIGN, OrderStatus.PENDING_CLIENT_APPROVAL, OrderStatus.IN_EMBROIDERY],
  PENDING_CLIENT_APPROVAL: [OrderStatus.PENDING_MANAGER_REVIEW, OrderStatus.IN_EMBROIDERY],
  IN_EMBROIDERY: [OrderStatus.READY_FOR_WAREHOUSE],
  READY_FOR_WAREHOUSE: [OrderStatus.SHIPPED],
  SHIPPED: [],
};
