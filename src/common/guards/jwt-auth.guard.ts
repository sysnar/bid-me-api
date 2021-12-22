import { BadRequestException, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { ResponseEntity } from '../libs/res-entity/ResponseEntity';
import { ResponseStatus } from '../libs/res-entity/ResponseStatus';
import { AdminService } from '@app/api/application/user/admin/admin.service';
import { User } from '@app/models/user/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private logger: Logger, private reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
      const isActivate = (await super.canActivate(context)) as boolean;

      if (!requiredRoles) {
        // Role이 필요없는 resource일 경우 검증하지 않음
        return true;
      }

      const { user, admin } = request.user;
      if (!user) return false;
      if (!admin) return false;

      return isActivate;
    } catch (error) {
      this.logger.error('JWT Auth Activate failed', error);
      throw new BadRequestException(
        ResponseEntity.ERROR_WITH('JWT Auth Activate failed', ResponseStatus.BAD_PARAMETER),
      );
    }
  }
}
