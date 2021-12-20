import { OmitType } from '@nestjs/mapped-types';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IBaseId } from '../IBase';

export class IUser extends IBaseId {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @IsNotEmpty()
  createdDt?: string;

  @IsDate()
  @IsOptional()
  updatedDt?: string;
}

export class UserCreateDTO extends OmitType(IUser, ['id', 'createdDt', 'updatedDt']) {}
export class UserUpdateDTO extends OmitType(IUser, ['createdDt', 'updatedDt']) {}
