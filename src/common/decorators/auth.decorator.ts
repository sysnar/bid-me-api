import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export function Auth(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles), //
    UseGuards(JwtAuthGuard),
  );
}
