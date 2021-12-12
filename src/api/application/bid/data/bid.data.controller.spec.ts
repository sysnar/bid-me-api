import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ParseBidDataPipe } from '../../../../common/pipes/bid.data.pipe';
import { BidDataController } from './bid.data.controller';
import { BidDataRepository } from './bid.data.repository';
import { BidDataService } from './bid.data.service';

describe('BidData Service', () => {
  let bidDataService: BidDataService;
  let bidDataController: BidDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [BidDataController],
      providers: [BidDataService, Logger, ParseBidDataPipe, BidDataRepository],
    }).compile();

    bidDataService = module.get<BidDataService>(BidDataService);
    bidDataController = module.get<BidDataController>(BidDataController);
  });

  describe('bidData Service', () => {
    it('should be defined', () => {
      expect(bidDataService).toBeDefined();
    });
  });

  describe('bidData Controller', () => {
    it('should be defined', () => {
      expect(bidDataController).toBeDefined();
    });
  });
});
