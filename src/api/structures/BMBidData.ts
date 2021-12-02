import { IsArray, IsNumber, IsString } from 'class-validator';

export interface IBidData extends IBidData.IBidID {
  bidNtceNo: string;

  bidNtceOrd: string;

  reNtceYn: string;

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

  bidPrtcptLmtYn: string;

  asignBdgtAmt: string;

  presmptPrce: string;

  opengPlce: string;

  bidNtceDtlUrl: string;

  srvceDivNm: string;

  rgstDt: string;

  bfSpecRgstNo: string;

  sucsfbidMthdNm: string;

  chgDt: string;

  indstrytyLmtYn: string;

  chgNtceRsn: string;

  rbidOpengDt: string;
}
export namespace IBidData {
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

  export class IBidID {
    @IsString()
    id: string;
  }
}
