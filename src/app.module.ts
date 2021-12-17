import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { getConfigModule, getTypeORMModule } from './config';
import { BidDataModule } from './api/application/bid/data/bid.data.module';
import { UserModule } from './api/application/user/user/user.module';
import { AdminModule } from './api/application/user/admin/admin.module';

@Module({
  imports: [ScheduleModule.forRoot(), getConfigModule(), getTypeORMModule(), BidDataModule, UserModule, AdminModule],
})
export class AppModule {}
