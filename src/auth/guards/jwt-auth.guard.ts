import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// AuthGuard('jwt') сам находит JwtStrategy (по умолчанию, зарегистрированную в PassportModule)
// и прогоняет через неё каждый входящий запрос
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
