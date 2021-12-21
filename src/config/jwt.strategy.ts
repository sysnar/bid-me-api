import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '@app/models/user/user.entity';
import { UserRepository } from '../api/application/user/user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: process.env.JWT_SECERT || configService.get<string>('secret.key'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { name } = payload;
    const user: User = await this.userRepository.findOne({ name });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
