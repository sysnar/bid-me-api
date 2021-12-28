import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { LocalDateTime } from 'js-joda';

import { DateCalculator } from '@app/common/libs/date-calculator';
import { OmitType } from '@nestjs/mapped-types';

export class IViews {
  @IsString()
  @IsNotEmpty()
  id: string;

  @Transform((property) => {
    return DateCalculator.toLocalDateTimeBy(property.value + '');
  })
  updatedDt: LocalDateTime;

  @IsString()
  bidId: string;

  @IsString()
  userId: string;
}

export class ViewsCreateDTO extends OmitType(IViews, ['id', 'updatedDt']) {}
