import { PageRequest } from '@app/common/libs/pagination/PageRequest';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BidBoolean } from 'src/models/bid/Bid.Data.entity';

export class IBidID {
  id: string;
}

export class IBidData extends IBidID {
  bidNtceNo: string;

  bidNtceOrd: string;

  reNtceYn: BidBoolean;

  bidNtceDt: string;

  bidNtceNm: string;

  ntceInsttNm: string;

  dminsttNm: string;

  bidMethdNm: string;

  cntrctCnclsMthdNm: string;

  bidQlfctRgstDt: string;

  bidBeginDt: string;

  bidClseDt: string;

  opengDt: string;

  rbidPermsnYn: string;

  bidPrtcptLmtYn: BidBoolean;

  asignBdgtAmt: string;

  presmptPrce: string;

  opengPlce: string;

  bidNtceDtlUrl: string;

  srvceDivNm: string;

  rgstDt: string;

  bfSpecRgstNo: string;

  sucsfbidMthdNm: string;

  chgDt: string;

  indstrytyLmtYn: BidBoolean;

  chgNtceRsn: string;

  rbidOpengDt: string;
}

export class RequestG2bApiDataDTO {
  @IsString()
  inqryDiv = '1';

  @IsString()
  inqryBgnDt = '202101010000';

  @IsString()
  inqryEndDt = '202106300000';

  @IsString()
  type = 'json';

  @IsNumber()
  pageNo = 1;

  @IsNumber()
  numOfRows = 100;

  @IsString()
  ServiceKey = process.env.API_KEY;
}

export class ResponseG2bApiHeaderDTO {
  @IsString()
  resultCode: string;

  @IsString()
  resultMsg: string;
}

export class ResponseG2bApiBodyDTO {
  @IsArray()
  items: IBidData[];
}

export interface ResponseG2bApiDataDTO {
  header: ResponseG2bApiHeaderDTO;

  body: ResponseG2bApiBodyDTO;
}

export interface CreateBidDataDTO extends Omit<IBidData, 'id'> {}

export class BidDataSearchDTO extends PageRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor() {
    super();
  }

  static create(name: string, pageNo: number, pageSize: number) {
    const param = new BidDataSearchDTO();
    param.name = name;
    param.pageNo = pageNo;
    param.pageSize = pageSize;
    return param;
  }

  hasName(): boolean {
    return this.name != null;
  }
}
