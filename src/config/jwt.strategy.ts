import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '@app/models/user/user.entity';
import { UserService } from '@app/api/application/user/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, configService: ConfigService) {
    super({
      secretOrKey: process.env.JWT_SECERT || configService.get<string>('secret.key'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload) {
    const { id } = payload;
    const user: User = await this.userService.findByUserId(id);

    if (Object.keys(user).length <= 0) {
      throw new UnauthorizedException('JWT Auth Validation fail');
    }

    return user;
  }
}
