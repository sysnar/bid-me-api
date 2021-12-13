import { OmitType, PartialType } from '@nestjs/mapped-types';
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
  created_dt: Date;

  @IsDate()
  @IsOptional()
  updated_dt?: Date;
}

export class UserCreateDTO extends OmitType(IUser, ['id'] as const) {}
export class UserUpdateDTO extends PartialType(IUser) {}

export class IUserReponse {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsBoolean()
  @IsOptional()
  deleted?: boolean;

  @IsString()
  @IsOptional()
  message?: string;
}
