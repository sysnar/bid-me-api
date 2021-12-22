import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '@app/config/jwt.strategy';
import { getJwtConfigModule } from '@app/config';
import { UserModule } from '../user/user/user.module';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { AdminModule } from '../user/admin/admin.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    getJwtConfigModule(),
    UserModule,
    AdminModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Logger, JwtAuthGuard],
})
export class AuthModule {}
