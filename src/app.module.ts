import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { getConfigModule, getTypeORMModule } from './config';
import { BidDataModule } from './api/bid.data/bid.data.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [ScheduleModule.forRoot(), getConfigModule(), getTypeORMModule(), BidDataModule, UserModule],
})
export class AppModule {}
