import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidDataService } from './bid.data.service';
import { BiddataController } from './bid.data.controller';
import { BidDataRepository } from './bid.data.repository';
import { ParseBidDataPipe } from 'src/pipes/bid.data.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([BidDataRepository])],
  controllers: [BiddataController],
  providers: [BidDataService, Logger, ParseBidDataPipe],
})
export class BidDataModule {}
