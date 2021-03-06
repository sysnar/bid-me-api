import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

import {
  IBidData,
  RequestG2bApiDataDTO,
  ResponseG2bApiBodyDTO,
  ResponseG2bApiDataDTO,
} from '@app/api/structure/bid/IBidData';
import { ParseBidDataPipe } from '@app/common/pipes/bid.data.pipe';
import { BidData } from '@app/models/bid/Bid.Data.entity';
import { BidDataRepository } from './bid.data.repository';

@Injectable()
export class BiDRequestService {
  constructor(
    private logger: Logger,
    private bidDataPipe: ParseBidDataPipe,

    @InjectRepository(BidDataRepository)
    private bidDataRepository: BidDataRepository,
  ) {}

  /*
   * 공공데이터 api Request(GET)에 쓰일 옵션(RequestG2bApiDataDTO) 객체를 파라미터 형태로 재설정해주는 함수
   */
  paramBuilder(options: RequestG2bApiDataDTO): string {
    let param = '';
    for (const paramName in options) param += `${paramName}=${options[paramName]}&`;
    return param;
  }

  /*
   * 기존 설정된 api End-point에 요청을 보내 받은 결과값을 반환하는 함수
   */
  async requestG2bApiData(
    requestG2bApiDataDTO: RequestG2bApiDataDTO,
  ): Promise<ResponseG2bApiDataDTO> {
    const _G2BApiDataURL = `http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoServc?`;
    const param = this.paramBuilder(requestG2bApiDataDTO);
    return axios
      .get(_G2BApiDataURL + param)
      .then((response: any): ResponseG2bApiDataDTO => response.data.response);
  }

  /*
   * 요청을 통해 받아온 API 데이터를 DB 형식에 맞게 필터링, 변환하는 함수
   */
  getFundamentalItems(g2bApiBody: ResponseG2bApiBodyDTO): BidData[] {
    return g2bApiBody.items.map((rowItem) => {
      return this.bidDataRepository.create(this.bidDataPipe.transform(rowItem));
    });
  }

  /*
   * 설정된 기간 내의 모든 입찰공고를 생성하는 함수
   */
  public async createBidData(requestG2bApiDataDTO: RequestG2bApiDataDTO): Promise<IBidData[]> {
    let createdBidData: IBidData[] = [];
    while (true) {
      const { header, body } = await this.requestG2bApiData(requestG2bApiDataDTO);

      if (header.resultCode !== '00') {
        // 정상적인 response가 이루어지지 않았을 경우 에러 발생
        this.logger.error('Service createApiData Error: response result is not valid');
        throw new HttpException(
          'Service createApiData Error: response result is not valid',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (body.items.length === 0) {
        // 마지막 페이지까지 요청이 완료되었을 경우 메세지와 함께 반환
        return createdBidData;
      }

      const resultBidData = await this.bidDataRepository.save(this.getFundamentalItems(body));
      createdBidData = [...createdBidData, ...resultBidData];
      requestG2bApiDataDTO.pageNo++;
    }
  }
}
