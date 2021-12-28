import { BookmarkCreateDTO } from '@app/api/structure/bid/IBookmark';
import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';
import { Body, Controller, InternalServerErrorException, Logger, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
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
      this.logger.error(`Bookmark - POST ${bookmarkCreateDTO}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('북마크 생성에 실패하였습니다.'),
      );
    }
  }
}
