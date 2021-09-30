import { Module } from '@nestjs/common';
import { ScrapperController } from './scrapper.controller';
import { Frontier, FsExplorer } from './scrapper.frontier';
import { ScrapperService } from './scrapper.service';

@Module({
  controllers: [ScrapperController],
  providers: [ScrapperService, Frontier, FsExplorer],
  exports: [Frontier],
})
export class ScrapperModule {}
