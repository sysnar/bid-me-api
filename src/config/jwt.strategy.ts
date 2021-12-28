import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '@app/models/user/user.entity';
import { UserService } from '@app/api/application/user/user/user.service';
import { AdminService } from '@app/api/application/user/admin/admin.service';
import { Admin } from '@app/models/user/Admin.entity';

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

  /*
   * 사용자 로그인 검증 - Guard의 canActivate를 통해 실행됨
   * Controller에서 전달받은 userId와 Role을 검증함
   *
   * role이 없을 경우 - User객체를 request에 포함
   * role이 있을 경우 - User객체와 Admin객체를 request에 포함
   */
  async validate(payload) {
    const { id, role } = payload;
    const user: User = await this.userService.findById(id);

    if (Object.keys(user).length <= 0) {
      throw new UnauthorizedException('JWT Strategy - Auth Validation fail');
    }

    if (role) {
      const admin: Admin = await this.adminService.findOneByUserId(id);
      return { user, admin };
    }

    return user;
  }
}
