import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { IBaseId } from '@app/api/structure/IBase';
import { IKeyword, KeywordCreateDTO } from '@app/api/structure/user/IKeyword';
import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';
import { KeywordService } from './keyword.service';

@Controller('keyword')
export class KeywordController {
  // prettier-ignore
  constructor(
    private keywordService: KeywordService, 
    private logger: Logger
  ) {}

  /*
   * @Param keywordId - 키워드 ID
   * 해당하는 키워드를 조회하여 반환
   */
  @Get(':keywordId')
  async getKeyword(@Param() keywordId: IBaseId) {
    try {
      const resData = await this.keywordService.getKeyword(keywordId);
      return ResponseEntity.OK_WITH(resData);
    } catch (error) {
      this.logger.error(`Keyword - GET ${JSON.stringify(keywordId)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('키워드 정보 조회에 실패하였습니다.'),
      );
    }
  }

  /*
   * @Body keyword - 키워드 ID, 이름
   * 키워드를 새로 등록
   */
  @Post()
  async createKeyword(@Body() keyword: KeywordCreateDTO) {
    try {
      const resData = await this.keywordService.createKeyword(keyword);
      return ResponseEntity.OK_WITH(resData);
    } catch (error) {
      this.logger.error(`Keyword POST ${JSON.stringify(keyword)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH(`키워드 생성에 실패하였습니다.`),
      );
    }
  }

  /*
   * @Body keywordId - 키워드 ID
   * 해당하는 키워드의 이름을 수정
   */
  @Put()
  async createAdmin(@Body() keyword: IKeyword) {
    try {
      const resData = await this.keywordService.updateKeyword(keyword);
      return ResponseEntity.OK_WITH(resData);
    } catch (error) {
      this.logger.error(`Keyword POST ${JSON.stringify(keyword)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH(`키워드명 수정에 실패하였습니다.`),
      );
    }
  }

  /*
   * @Body keywordId - 키워드 ID
   * 해당하는 키워드명을 삭제
   */
  @Delete()
  async deleteAdmin(@Body() keywordId: IBaseId) {
    try {
      await this.keywordService.deleteKeyword(keywordId);
      return ResponseEntity.OK_WITH('키워드 삭제가 정상적으로 완료되었습니다.');
    } catch (error) {
      this.logger.error(`Keyword DELETE ${JSON.stringify(keywordId)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('키워드 삭제에 실패하였습니다.'),
      );
    }
  }
}
