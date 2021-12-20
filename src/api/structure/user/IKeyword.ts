import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { IBaseId } from '../IBase';

export class IKeyword extends IBaseId {
  @IsString()
  @IsNotEmpty()
  keyword: string;
}

export class KeywordCreateDTO extends OmitType(IKeyword, ['id']) {}
