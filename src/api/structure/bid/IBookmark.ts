import { OmitType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class IBookmark {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  userId: string;

  @IsString()
  bidId: string;
}

export class BookmarkCreateDTO extends OmitType(IBookmark, ['id']) {}
export class BookmarkDelteDTO extends PickType(IBookmark, ['id']) {}
