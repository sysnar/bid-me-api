import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { IBaseId } from '@app/api/structure/IBase';
import { IKeyword, KeywordCreateDTO } from '@app/api/structure/user/IKeyword';
import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';
import { KeywordService } from './keyword.service';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';

@Controller('keyword')
@UseGuards(JwtAuthGuard)
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
      const resData = await this.keywordService.findOneById(keywordId);
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
      const resData = await this.keywordService.create(keyword);
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
  async updateKeyword(@Body() keyword: IKeyword) {
    try {
      const resData = await this.keywordService.update(keyword);
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
  async deleteKeyword(@Body() keywordId: IBaseId) {
    try {
      await this.keywordService.delete(keywordId);
      return ResponseEntity.OK_WITH('키워드 삭제가 정상적으로 완료되었습니다.');
    } catch (error) {
      this.logger.error(`Keyword DELETE ${JSON.stringify(keywordId)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('키워드 삭제에 실패하였습니다.'),
      );
    }
  }
}
