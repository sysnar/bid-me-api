import { Body, Controller, Post } from '@nestjs/common';

import { IBidData } from '@app/api/structure/IBidData';
import { BidDataService } from './bid.data.service';

@Controller('apidata')
export class BidDataController {
  constructor(private bidDataService: BidDataService) {}

  @Post()
  async createBidData(@Body() requestG2bBidDataDTO: IBidData.RequestG2bApiDataDTO): Promise<IBidData[]> {
    return await this.bidDataService.createBidData(requestG2bBidDataDTO);
  }
}
