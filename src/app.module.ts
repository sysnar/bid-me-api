import { Module } from '@nestjs/common';
import { ScrapperModule } from './scrapper/scrapper.module';
import { ScheduleModule } from '@nestjs/schedule';
import { getConfigModule, getTypeORMModule } from './config';
import { ApidataModule } from './apidata/apidata.module';

@Module({
  imports: [ScheduleModule.forRoot(), ScrapperModule, getConfigModule(), getTypeORMModule(), ApidataModule],
})
export class AppModule {}
