import { Body, Controller, Post } from '@nestjs/common';
import { BidDataService } from './bid.data.service';
import { RequestG2bApiDataDTO } from './dto/request-g2bApiData.dto';

@Controller('apidata')
export class BiddataController {
  constructor(private bidDataService: BidDataService) {}

  @Post()
  async createBidData(@Body() requestG2bBidDataDTO: RequestG2bApiDataDTO) {
    return await this.bidDataService.createBidData(requestG2bBidDataDTO);
  }
}
