import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // достаёт токен из "Authorization: Bearer <token>"
      ignoreExpiration: false, // явно требуем проверку срока действия (defaults уже false, но пишем явно для читаемости)
      secretOrKey: configService.get<string>('JWT_SECRET'), // тот же секрет, которым подписывали токен
    });
  }

  // Вызывается Passport'ом АВТОМАТИЧЕСКИ, только если подпись токена валидна и токен не истёк
  validate(payload: JwtPayload) {
    // то, что вернёт этот метод, Nest положит в request.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
