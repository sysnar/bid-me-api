import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { ResponseEntity } from '../libs/res-entity/ResponseEntity';
import { ResponseStatus } from '../libs/res-entity/ResponseStatus';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private logger: Logger, private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

      // request context의 JWT 토큰을 검증하는 로직
      // JWT Strategy의 validation을 실행
      const isActivate = (await super.canActivate(context)) as boolean;

      // Role이 필요없는 resource일 경우 접근권한을 검증하지 않음
      if (!requiredRoles) {
        return true;
      }

      const { user, admin } = request.user;
      if (!user) return false;
      if (!admin) return false;

      return isActivate;
    } catch (error) {
      this.logger.error(`JWT Auth Guard - Activate failed`, error);

      // JWT 토큰 인증에 실패할 경우 401 ERROR를 반환
      // canAcivate가 실패할 경우 error 객체에 해당 사항이 저장됨
      if (error.status === 401) {
        throw new UnauthorizedException(
          ResponseEntity.ERROR_WITH('인증에 실패하였습니다.', ResponseStatus.UNAUTHORIZED),
        );
      }

      // 이외의 모든 예외상황의 경우 500 ERROR를 반환
      throw new BadRequestException(
        ResponseEntity.ERROR_WITH('서버 문제가 발생하였습니다.', ResponseStatus.SERVER_ERROR),
      );
    }
  }
}
