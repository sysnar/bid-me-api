import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class typeORMConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): any {
    // return this.configService.get('database');

    // 조금더 options을 명확하게 사용하기 위해 명시적으로 각 옵션들을 명시함
    return {
      type: this.configService.get<string>('database.type'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      port: +this.configService.get<number>('database.port'),
      host: this.configService.get<string>('database.host'),
      database: this.configService.get<string>('database.database'),
      synchronize: this.configService.get<boolean>('database.synchronize'),
      entities: this.configService.get<string>('database.entities'),
      namingStrategy: this.configService.get<string>('database.namingStrategy'),
    };
  }
}
