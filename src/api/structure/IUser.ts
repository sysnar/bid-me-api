import { OmitType } from '@nestjs/mapped-types';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class IUserId {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class IUser extends IUserId {
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

export class IUserReponse {
  @IsNumber()
  @IsOptional()
  status?: number;

  @IsBoolean()
  @IsOptional()
  deleted?: boolean;

  @IsString()
  @IsOptional()
  message?: string;
}
