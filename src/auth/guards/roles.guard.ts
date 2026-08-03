import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../users/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // достаём массив ролей, который @Roles(...) прикрепил к конкретному обработчику маршрута
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), // сам метод контроллера (например, updateStatus)
      context.getClass(), // весь класс контроллера (на случай @Roles на уровне всего контроллера)
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // если @Roles() вообще не указан — доступ не ограничен по ролям
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // положено туда JwtStrategy.validate() ранее в цепочке Guards

    return requiredRoles.includes(user?.role);
  }
}
