import {
  Body,
  ConflictException,
  Controller,
  Get,
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
import { GetUser } from '@app/common/decorators/token.decorator';
import { User } from '@app/models/user/user.entity';

@Controller('bookmark')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService, //
    private logger: Logger,
  ) {}

  @Get('/rank')
  async getBookmarkRank() {
    try {
      const bookmarkRank = await this.bookmarkService.rank();
      console.log('book : ', bookmarkRank);
      return ResponseEntity.OK_WITH(bookmarkRank, '북마크 랭킹을 조회하였습니다.');
    } catch (error) {
      this.logger.error(`Bookmark - GET `, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('북마크 조회에 실패하였습니다.'),
      );
    }
  }

  @Get()
  async getBookmark(@GetUser() userEntity: User) {
    try {
      const foundBookmark = await this.bookmarkService.findByUser(userEntity);
      return ResponseEntity.OK_WITH(foundBookmark, '북마크를 조회하였습니다.');
    } catch (error) {
      this.logger.error(`Bookmark - GET ${JSON.stringify(userEntity)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('북마크 조회에 실패하였습니다.'),
      );
    }
  }

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
