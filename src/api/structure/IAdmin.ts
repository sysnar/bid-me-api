import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class IAdminId {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class IAdmin extends IAdminId {
  user_id: string;

  createdDt: Date;

  updatedDt: Date;
}

export class AdminCreateDTO extends OmitType(IAdmin, ['id', 'createdDt', 'updatedDt']) {}
export class AdminUpdateDTO extends OmitType(IAdmin, ['createdDt', 'updatedDt']) {}
