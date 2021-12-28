import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { IBidData } from '@app/api/structure/bid/IBidData';
import { BidDataService } from './bid.data.service';

@Controller('bid')
export class BidDataController {
  constructor(private bidDataService: BidDataService) {}

  @Get('/:keyword')
  async getBidDataByKeyword(@Param('keyword') keyword: string) {
    return await this.bidDataService.findOneByKeyword(keyword);
  }

  @Post()
  async createBidData(
    @Body() requestG2bBidDataDTO: IBidData.RequestG2bApiDataDTO,
  ): Promise<IBidData[]> {
    return await this.bidDataService.create(requestG2bBidDataDTO);
  }
}
