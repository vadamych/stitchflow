import { Request } from 'express';
import { Role } from '../users/role.enum';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
    role: Role;
  };
}
