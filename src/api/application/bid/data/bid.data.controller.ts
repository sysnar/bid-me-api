import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
} from '@nestjs/common';

import { BidDataSearchDTO, IBidData, RequestG2bApiDataDTO } from '@app/api/structure/bid/IBidData';
import { BidDataService } from './bid.data.service';
import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';

@Controller('bid')
export class BidDataController {
  constructor(private bidDataService: BidDataService, private logger: Logger) {}

  @Get('/random')
  async getBidDataRandom() {
    try {
      const searchData = await this.bidDataService.findRandom();
      return ResponseEntity.OK_WITH(searchData, `무작위 추천 입찰공고 정보입니다.`);
    } catch (error) {
      this.logger.error(`Bid GET - bid data random Error `, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('입찰공고 정보 검색에 실패하였습니다.'),
      );
    }
  }

  @Get('/:keyword')
  async getBidDataByKeyword(@Param('keyword') keyword: string) {
    return await this.bidDataService.findOneByKeyword(keyword);
  }

  @Get()
  async getBidDataByName(@Body() param: BidDataSearchDTO) {
    try {
      const searchData = await this.bidDataService.searchByKeyword(param);
      return ResponseEntity.OK_WITH(searchData, `${param.name}에 대한 입찰공고 정보입니다.`);
    } catch (error) {
      this.logger.error(`Bid GET - bid data search Error ${JSON.stringify(param)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('입찰공고 정보 검색에 실패하였습니다.'),
      );
    }
  }
  D;

  @Post()
  async createBidData(@Body() requestG2bBidDataDTO: RequestG2bApiDataDTO): Promise<IBidData[]> {
    return await this.bidDataService.create(requestG2bBidDataDTO);
  }
}
