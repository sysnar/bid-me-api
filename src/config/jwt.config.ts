import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}
  createJwtOptions(): any {
    // 조금더 options을 명확하게 사용하기 위해 명시적으로 각 옵션들을 명시함

    return {
      secret: process.env.JWT_SECRET || this.configService.get<string>('secret.key'),
      signOptions: {
        expiresIn: Number(this.configService.get<number>('secret.expire')),
      },
    };
  }
}
