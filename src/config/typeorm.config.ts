import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class typeORMConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions() {
    return this.configService.get('database');
    // return {
    //   type: 'mysql',
    //   username: this.configService.get<string>('database.username'),
    //   password: this.configService.get<string>('database.password'),
    //   port: +this.configService.get<number>('database.port'),
    //   host: this.configService.get<string>('database.host'),
    //   database: this.configService.get<string>('database.dbname'),
    //   entities: ['dist/**/**/*.entity{.ts,.js}'],
    //   autoLoadEntities: true,
    // };
  }
}
