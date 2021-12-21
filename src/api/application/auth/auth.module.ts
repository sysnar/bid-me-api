import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '@app/config/jwt.strategy';
import { getJwtConfigModule } from '@app/config';
import { UserModule } from '../user/user/user.module';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), getJwtConfigModule(), UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Logger, JwtAuthGuard],
})
export class AuthModule {}
