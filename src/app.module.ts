import { Module } from '@nestjs/common';
import { ScrapperModule } from './scrapper/scrapper.module';
import { ScheduleModule } from '@nestjs/schedule';
import { getConfigModule, getTypeORMModule } from './config';
import { BidDataModule } from './api/bid.data/bid.data.module';

@Module({
  imports: [ScheduleModule.forRoot(), ScrapperModule, getConfigModule(), getTypeORMModule(), BidDataModule],
})
export class AppModule {}
