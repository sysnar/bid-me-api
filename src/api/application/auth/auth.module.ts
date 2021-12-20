import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../user/user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../../config/jwt.strategy';
import { getJwtConfigModule } from '@app/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    getJwtConfigModule(),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Logger],
})
export class AuthModule {}
