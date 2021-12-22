import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import configuration from './configuration';
import { typeORMConfig } from './typeorm.config';
import validationSchema from './config.validation';
import { JwtConfig } from './jwt.config';

export const getConfigModule = () =>
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.test.env',
    ignoreEnvFile: process.env.NODE_ENV === 'prod', // 배포환경일 경우 환경변수에 직접
    load: [configuration],
    validationSchema,
  });

export const getTypeORMModule = () =>
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useClass: typeORMConfig,
  });

export const getJwtConfigModule = () =>
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useClass: JwtConfig,
  });
