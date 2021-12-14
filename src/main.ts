import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { setNestGlobal } from './common/libs/setGlobalApp';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('NODE_PORT');

  setNestGlobal(app);

  await app.listen(port);
  Logger.log(`Certificate Applacation started with port : ${port}`);
}
bootstrap();
