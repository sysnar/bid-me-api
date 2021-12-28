import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';

import { BookmarkService } from './bookmark.service';
import { BookmarkCreateDTO } from '@app/api/structure/bid/IBookmark';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';
import { ResponseStatus } from '@app/common/libs/res-entity/ResponseStatus';

@Controller('bookmark')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService, //
    private logger: Logger,
  ) {}

  /*
   * @Body BookmarkCreateDTO - 사용자 ID, 입찰공고 ID
   * 사용자의 북마크를 생성
   */
  @Post()
  async createBookmark(
    @Body() bookmarkCreateDTO: BookmarkCreateDTO,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.bookmarkService.create(bookmarkCreateDTO);
      return ResponseEntity.OK('북마크 생성되었습니다.');
    } catch (error) {
      this.logger.error(`Bookmark - POST ${JSON.stringify(bookmarkCreateDTO)}`, error);

      if (error?.code === '23505') {
        throw new ConflictException(
          ResponseEntity.ERROR_WITH('이미 존재하는 북마크입니다.', ResponseStatus.CONFLICT),
        );
      }

      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('북마크 생성에 실패하였습니다.'),
      );
    }
  }
}
