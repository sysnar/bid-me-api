import { DateCalculator } from '@app/common/libs/date-calculator';
import { OmitType } from '@nestjs/mapped-types';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { LocalDateTime } from 'js-joda';
import { IBaseId } from '../IBase';

export class IGroup extends IBaseId {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @Transform((property) => {
    return DateCalculator.toLocalDateTimeBy(property.value + '');
  })
  createdDt: LocalDateTime;

  @Expose()
  @Transform((property) => {
    return DateCalculator.toLocalDateTimeBy(property.value + '');
  })
  updatedDt: LocalDateTime;
}

export class GroupCreateDTO extends OmitType(IGroup, ['id', 'createdDt', 'updatedDt']) {}
export class GroupUpdateDTO extends OmitType(IGroup, ['createdDt', 'updatedDt']) {}
