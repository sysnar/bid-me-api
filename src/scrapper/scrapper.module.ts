import { Module } from '@nestjs/common';
import { DateCalculator } from '../libs/date-calculator';
import { FsExplorer } from './fsExplorer.model';
import { ScrapperController } from './scrapper.controller';
import { Frontier } from './scrapper.frontier';
import { ScrapperService } from './scrapper.service';

@Module({
  controllers: [ScrapperController],
  providers: [ScrapperService, Frontier, FsExplorer, DateCalculator],
  exports: [Frontier],
})
export class ScrapperModule {}
