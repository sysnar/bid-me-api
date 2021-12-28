import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BidDataSearchDTO, IBidData, RequestG2bApiDataDTO } from '@app/api/structure/bid/IBidData';
import { BidDataRepository } from './bid.data.repository';
import { BiDRequestService } from './bid.request.service';
import { BidData } from '@app/models/bid/Bid.Data.entity';
import { Like } from 'typeorm';
import { Page } from '@app/common/libs/pagination/Page';

/*
 * BidDataService 는 공공데이터 api로부터 데이터를 수집하는 서비스이다.
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

  async findById(id: string): Promise<BidData> {
    return await this.bidDataRepository.findOne({ id });
  }

  async findOneByKeyword(keyword: string): Promise<BidData[]> {
    return await this.bidDataRepository.find({ where: { bidNtceNm: Like(`%${keyword}%`) } });
  }

  async searchByKeyword(param: BidDataSearchDTO) {
    const result = await this.bidDataRepository.paging(param);
    return new Page<BidData>(result[1], param.pageSize, result[0]);
  }

  create(requestG2bBidDataDTO: RequestG2bApiDataDTO): Promise<IBidData[]> {
    return this.bidRequestService.createBidData(requestG2bBidDataDTO);
  }
}
