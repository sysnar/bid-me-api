import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IBidData } from '@app/api/structure/bid/IBidData';
import { BidDataRepository } from './bid.data.repository';
import { BiDRequestService } from './bid.request.service';
import { BidData } from '@app/models/bid/Bid.Data.entity';
import { Like } from 'typeorm';

/*
 * ApiDataService 는 공공데이터 api로부터 데이터를 수집하는 서비스이다.
 * 수집한 데이터를 가공하여 사용할 수 있는 형태로 반환한다.
 */
@Injectable()
export class BidDataService {
  constructor(
    private logger: Logger,
    private bidRequestService: BiDRequestService,

    @InjectRepository(BidDataRepository)
    private bidDataRepository: BidDataRepository,
  ) {}

  async findOneById(id: string): Promise<BidData> {
    return await this.bidDataRepository.findOne({ id });
  }

  async findOneByKeyword(keyword: string): Promise<BidData[]> {
    console.log(await this.bidDataRepository.find({ where: { bidNtceNm: Like(`%${keyword}%`) } }));
    console.log(keyword);
    return await this.bidDataRepository.find({ where: { bidNtceNm: Like(`%${keyword}%`) } });
  }

  create(requestG2bBidDataDTO: IBidData.RequestG2bApiDataDTO): Promise<IBidData[]> {
    return this.bidRequestService.createBidData(requestG2bBidDataDTO);
  }
}
