import { OmitType } from '@nestjs/mapped-types';

import { IBaseId } from '../IBase';

export class IAdmin extends IBaseId {
  userId: string;

  createdDt: Date;

  updatedDt: Date;
}

export class AdminCreateDTO extends OmitType(IAdmin, ['id', 'createdDt', 'updatedDt']) {}
export class AdminUpdateDTO extends OmitType(IAdmin, ['createdDt', 'updatedDt']) {}
