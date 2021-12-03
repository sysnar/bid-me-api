import { BadRequestException, Logger, PipeTransform } from '@nestjs/common';
import Joi from 'joi';

import { IBidData } from 'src/api/structures/IBidData';

export const bidDataSchema = Joi.object({
  bidNtceNo: Joi.required(),
  bidNtceOrd: Joi.required(),
  reNtceYn: Joi.required(),
  bidNtceDt: Joi.required(),
  bidNtceNm: Joi.required(),
  ntceInsttNm: Joi.required(),
  dminsttNm: Joi.required(),
  bidMethdNm: Joi.required(),
  cntrctCnclsMthdNm: Joi.required(),
  bidQlfctRgstDt: Joi.required(),
  bidBeginDt: Joi.required(),
  bidClseDt: Joi.required(),
  opengDt: Joi.required(),
  rbidPermsnYn: Joi.required(),
  bidPrtcptLmtYn: Joi.required(),
  asignBdgtAmt: Joi.required(),
  presmptPrce: Joi.required(),
  opengPlce: Joi.required(),
  bidNtceDtlUrl: Joi.required(),
  srvceDivNm: Joi.required(),
  rgstDt: Joi.required(),
  bfSpecRgstNo: Joi.required(),
  sucsfbidMthdNm: Joi.required(),
  chgDt: Joi.required(),
  indstrytyLmtYn: Joi.required(),
  chgNtceRsn: Joi.required(),
  rbidOpengDt: Joi.required(),
}).options({ abortEarly: false, allowUnknown: true });

export class ParseBidDataPipe implements PipeTransform<any, IBidData.CreateBidDataDTO> {
  public transform(query: any): IBidData.CreateBidDataDTO {
    const result = bidDataSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      Logger.error(`BiD Data Pipe Error: ${errorMessages}`);
      throw new BadRequestException(errorMessages);
    }

    const validBidData: IBidData.CreateBidDataDTO = result.value;
    return {
      bidNtceNo: validBidData.bidNtceNo,
      bidNtceOrd: validBidData.bidNtceOrd,
      reNtceYn: validBidData.reNtceYn,
      bidNtceDt: validBidData.bidNtceDt,
      bidNtceNm: validBidData.bidNtceNm,
      ntceInsttNm: validBidData.ntceInsttNm,
      dminsttNm: validBidData.dminsttNm,
      bidMethdNm: validBidData.bidMethdNm,
      cntrctCnclsMthdNm: validBidData.cntrctCnclsMthdNm,
      bidQlfctRgstDt: validBidData.bidQlfctRgstDt,
      bidBeginDt: validBidData.bidBeginDt,
      bidClseDt: validBidData.bidClseDt,
      opengDt: validBidData.opengDt,
      rbidPermsnYn: validBidData.rbidPermsnYn,
      bidPrtcptLmtYn: validBidData.bidPrtcptLmtYn,
      asignBdgtAmt: validBidData.asignBdgtAmt,
      presmptPrce: validBidData.presmptPrce,
      opengPlce: validBidData.opengPlce,
      bidNtceDtlUrl: validBidData.bidNtceDtlUrl,
      srvceDivNm: validBidData.srvceDivNm,
      rgstDt: validBidData.rgstDt,
      bfSpecRgstNo: validBidData.bfSpecRgstNo,
      sucsfbidMthdNm: validBidData.sucsfbidMthdNm,
      chgDt: validBidData.chgDt,
      indstrytyLmtYn: validBidData.indstrytyLmtYn,
      chgNtceRsn: validBidData.chgNtceRsn,
      rbidOpengDt: validBidData.rbidOpengDt,
    };
  }
}
