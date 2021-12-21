import { BadRequestException, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseEntity } from '../libs/res-entity/ResponseEntity';
import { ResponseStatus } from '../libs/res-entity/ResponseStatus';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private logger: Logger) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const isActivate = (await super.canActivate(context)) as boolean;

      return isActivate;
    } catch (error) {
      this.logger.error('JWT Auth Acticate filed');
      throw new BadRequestException(
        ResponseEntity.ERROR_WITH('JWT Auth Acticate filed', ResponseStatus.BAD_PARAMETER),
      );
    }
  }
}
