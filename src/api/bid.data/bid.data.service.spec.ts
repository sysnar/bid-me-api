import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppModule } from '../../app.module';
import { getConfigModule } from '../../config';
import { BidData } from '../../models/bid/bid.data.entity';
import { ParseBidDataPipe } from '../../pipes/bid.data.pipe';
import { BidDataRepository } from './bid.data.repository';
import { BidDataService } from './bid.data.service';
import { BidDataModule } from './bid.data.module';

/* 2번째 파일 - 테스트 코드 입니다 */
const mockBidDataRepository = () => ({
  save: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('BidData Service', () => {
  let bidDataService: BidDataService;
  let bidDataRepository: MockRepository<BidData>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BidDataService, Logger, ParseBidDataPipe, { provide: BidDataRepository, useValue: mockBidDataRepository() }],
      // providers: [Logger, ParseBidDataPipe, { provide: getRepositoryToken(BidData), useValue: mockBidDataRepository() }],
    }).compile();

    bidDataService = await module.resolve(BidDataService);
    bidDataRepository = await module.resolve(BidDataRepository);
  });

  describe('bidData Service', () => {
    it('should be defined', () => {
      expect(bidDataService).toBeDefined();
    });
  });

  describe('bidData Repository', () => {
    it('should be defined', () => {
      expect(bidDataRepository).toBeDefined();
    });
  });
});
