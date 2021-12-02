import { IsArray, IsObject, IsString } from 'class-validator';
import { BidData } from '../../../models/bid/bid.data.entity';

export class ResponseG2bApiHeaderDTO {
  @IsString()
  resultCode: string;

  @IsString()
  resultMsg: string;
}

export class ResponseG2bApiBodyDTO {
  @IsArray()
  items: BidData[];
}

export class ResponseG2bApiDataDTO {
  @IsObject()
  header: ResponseG2bApiHeaderDTO;

  @IsObject()
  body: ResponseG2bApiBodyDTO;
}
