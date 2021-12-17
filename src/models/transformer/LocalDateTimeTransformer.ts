import { LocalDateTime } from 'js-joda';
import { ValueTransformer } from 'typeorm';

import { DateCalculator } from '@app/common/libs/date-calculator';

export class LocalDateTimeTransformer implements ValueTransformer {
  // Entity -> DB로 값을 넣는 경우
  to(entityValue: LocalDateTime): Date {
    return DateCalculator.toDate(entityValue);
  }

  // DB -> Entity로 값을 가져오는 경우
  from(databaseValue: Date) {
    return DateCalculator.toLocalDateTime(databaseValue);
  }
}
