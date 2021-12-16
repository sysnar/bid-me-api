import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

import { ParseBidDataPipe } from '@app/common/pipes/bid.data.pipe';
import { BidData } from '@app/models/bid/Bid.Data.entity';
import { IBidData } from '@app/api/structure/IBidData';
import { BidDataRepository } from './bid.data.repository';

/*
 * ApiDataService 는 공공데이터 api로부터 데이터를 수집하는 서비스이다.
 * 수집한 데이터를 가공하여 사용할 수 있는 형태로 반환한다.
 */
@Injectable()
export class BidDataService {
  constructor(
    private logger: Logger,
    private bidDataPipe: ParseBidDataPipe,

    @InjectRepository(BidDataRepository)
    private bidDataRepository: BidDataRepository,
  ) {}

  /*
   * 공공데이터 api Request(GET)에 쓰일 옵션(RequestG2bApiDataDTO) 객체를 파라미터 형태로 재설정해주는 함수
   */
  paramBuilder(options: IBidData.RequestG2bApiDataDTO): string {
    let param = '';
    for (const paramName in options) param += `${paramName}=${options[paramName]}&`;
    return param;
  }

  /*
   * 기존 설정된 api End-point에 요청을 보내 받은 결과값을 반환하는 함수
   */
  async requestG2bApiData(requestG2bApiDataDTO: IBidData.RequestG2bApiDataDTO): Promise<IBidData.ResponseG2bApiDataDTO> {
    const _G2BApiDataURL = `http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoServc?`;
    const param = this.paramBuilder(requestG2bApiDataDTO);
    return axios.get(_G2BApiDataURL + param).then((response: any): IBidData.ResponseG2bApiDataDTO => response.data.response);
  }

  /*
   * 요청을 통해 받아온 API 데이터를 DB 형식에 맞게 필터링, 변환하는 함수
   */
  getFundamentalItems(g2bApiBody: IBidData.ResponseG2bApiBodyDTO): BidData[] {
    return g2bApiBody.items.map((rowItem) => {
      return this.bidDataRepository.create(this.bidDataPipe.transform(rowItem));
    });
  }

  /*
   * 설정된 기간 내의 모든 입찰공고를 생성하는 함수
   */
  public async createBidData(requestG2bApiDataDTO: IBidData.RequestG2bApiDataDTO): Promise<IBidData[]> {
    let createdBidData: IBidData[] = [];
    while (true) {
      const { header, body } = await this.requestG2bApiData(requestG2bApiDataDTO);

      if (header.resultCode !== '00') {
        // 정상적인 response가 이루어지지 않았을 경우 에러 발생
        this.logger.error('Service createApiData Error: response result is not valid');
        throw new HttpException('Service createApiData Error: response result is not valid', HttpStatus.INTERNAL_SERVER_ERROR);
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
