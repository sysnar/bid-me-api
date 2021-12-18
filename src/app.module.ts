import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { getConfigModule, getTypeORMModule } from './config';
import { BidDataModule } from './api/application/bid/data/bid.data.module';
import { UserModule } from './api/application/user/user/user.module';
import { AdminModule } from './api/application/user/admin/admin.module';
import { ExceptionTransformFilter } from './common/filters/exception-transform.filter';

@Module({
  imports: [ScheduleModule.forRoot(), getConfigModule(), getTypeORMModule(), BidDataModule, UserModule, AdminModule],
  providers: [{ provide: APP_FILTER, useClass: ExceptionTransformFilter }],
})
export class AppModule {}
