import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParseBidDataPipe } from '@app/common/pipes/bid.data.pipe';
import { BidDataService } from './bid.data.service';
import { BidDataController } from './bid.data.controller';
import { BidDataRepository } from './bid.data.repository';
import { BiDRequestService } from './bid.request.service';

@Module({
  imports: [TypeOrmModule.forFeature([BidDataRepository])],
  controllers: [BidDataController],
  providers: [BidDataService, BiDRequestService, Logger, ParseBidDataPipe],
})
export class BidDataModule {}
