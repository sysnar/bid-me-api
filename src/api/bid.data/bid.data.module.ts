import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidDataService } from './bid.data.service';
import { BidDataController } from './bid.data.controller';
import { BidDataRepository } from './bid.data.repository';
import { ParseBidDataPipe } from '../../pipes/bid.data.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([BidDataRepository])],
  controllers: [BidDataController],
  providers: [BidDataService, Logger, ParseBidDataPipe],
})
export class BidDataModule {}
