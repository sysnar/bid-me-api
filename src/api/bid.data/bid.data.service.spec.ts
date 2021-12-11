import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import axios from 'axios';

import { BidBoolean, BidData } from '../../models/bid/Bid.Data.entity';
import { ParseBidDataPipe } from '../../common/pipes/bid.data.pipe';
import { BidDataRepository } from './bid.data.repository';
import { BidDataService } from './bid.data.service';

/* Axios를 통한 HTTP 통신을 모킹하는 데이터 입니다. */
const FakeBidData = {
  id: '1',
  bidNtceNo: '1',
  bidNtceOrd: '1',
  reNtceYn: BidBoolean.YES,
  bidNtceDt: 'string',
  bidNtceNm: 'string',
  ntceInsttNm: 'string',
  dminsttNm: 'string',
  bidMethdNm: 'string',
  cntrctCnclsMthdNm: 'string',
  bidQlfctRgstDt: 'string',
  bidBeginDt: 'string',
  bidClseDt: 'string',
  opengDt: 'string',
  rbidPermsnYn: 'string',
  bidPrtcptLmtYn: BidBoolean.YES,
  asignBdgtAmt: 'string',
  presmptPrce: 'string',
  opengPlce: 'string',
  bidNtceDtlUrl: 'string',
  srvceDivNm: 'string',
  rgstDt: 'string',
  bfSpecRgstNo: 'string',
  sucsfbidMthdNm: 'string',
  chgDt: 'string',
  indstrytyLmtYn: BidBoolean.YES,
  chgNtceRsn: 'string',
  rbidOpengDt: 'string',
};

/* Axios를 통한 HTTP 통신을 Mocking하는 데이터 입니다. */
const mockData = {
  data: {
    response: {
      header: { resultCode: '00', resultMsg: 'success' },
      body: {
        items: [FakeBidData],
      },
    },
  },
};

/* Repository를 Mocking하기 위한 코드입니다. */
const mockBidDataRepository = () => ({
  save: jest.fn().mockResolvedValue([FakeBidData]),
  create: jest.fn(),
});

/* HTTP 통신결과를 Mocking 하기 위해 Mock axios 라이브러리를 선언합니다. */
jest.mock('axios');

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('BidData Service', () => {
  let bidDataService: BidDataService;
  let bidDataRepository: MockRepository<BidData>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BidDataService, Logger, ParseBidDataPipe, { provide: BidDataRepository, useValue: mockBidDataRepository() }],
    }).compile();

    bidDataService = await module.resolve(BidDataService);
    bidDataRepository = await module.resolve(BidDataRepository);
  });

  describe('bidData Service', () => {
    it('should be defined', () => {
      expect(bidDataService).toBeDefined();
    });
  });

  const paramDTO = {
    inqryDiv: '1',
    inqryBgnDt: '202101010000',
    inqryEndDt: '202106300000',
    type: 'json',
    pageNo: 1,
    numOfRows: 100,
    ServiceKey: 'APIKEY',
  };

  describe('bidData Service paramBuilder', () => {
    it('should create URL query', () => {
      const result = bidDataService.paramBuilder(paramDTO);
      expect(result).toBe('inqryDiv=1&inqryBgnDt=202101010000&inqryEndDt=202106300000&type=json&pageNo=1&numOfRows=100&ServiceKey=APIKEY&');
    });
  });

  describe('bidData Service createBidData', () => {
    let flag = true;
    it('should create bidData & return INSERTED Data Array', async () => {
      const spy = (axios.get as jest.Mock).mockImplementation(async (url) => {
        const resoponseData = mockData;
        if (flag) {
          flag = false;
          return resoponseData;
        }
        resoponseData.data.response.body.items = [];
        return resoponseData;
      });
      const result = await bidDataService.createBidData(paramDTO);
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual([FakeBidData]);
    });
  });

  describe('bidData Repository', () => {
    it('should be defined', () => {
      expect(bidDataRepository).toBeDefined();
    });
  });
});
