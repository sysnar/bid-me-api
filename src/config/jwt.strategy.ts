import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '@app/models/user/user.entity';
import { UserService } from '@app/api/application/user/user/user.service';
import { AdminService } from '@app/api/application/user/admin/admin.service';
import { Admin } from '@app/models/user/Admin.entity';
import { IBaseId } from '@app/api/structure/IBase';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: process.env.JWT_SECERT || configService.get<string>('secret.key'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload) {
    const { id, role } = payload;
    const user: User = await this.userService.findByUserId(id);

    if (Object.keys(user).length <= 0) {
      throw new UnauthorizedException('JWT Auth Validation fail');
    }

    if (role) {
      const admin: Admin = await this.adminService.findOneByUserId(id);
      return { user, admin };
    }

    return user;
  }
}
