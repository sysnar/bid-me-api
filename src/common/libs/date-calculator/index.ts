import { convert, DateTimeFormatter, LocalDate, LocalDateTime, nativeJs } from 'js-joda';

export class DateCalculator {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
  private static DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss');

  static toString(localDate: LocalDate | LocalDateTime): string {
    if (!localDate) return '';

    if (localDate instanceof LocalDate) {
      return localDate.format(DateCalculator.DATE_FORMATTER);
    }

    return localDate.format(DateCalculator.DATE_TIME_FORMATTER);
  }

  static toDate(localDate: LocalDate | LocalDateTime): Date {
    if (!localDate) return null;

    return convert(localDate).toDate();
  }

  static toLocalDate(date: Date): LocalDate {
    if (!date) return null;

    return LocalDate.from(nativeJs(date));
  }

  static toLocalDateTime(date: Date): LocalDateTime {
    if (!date) return null;

    return LocalDateTime.from(nativeJs(date));
  }

  static toLocalDateBy(strDate: string): LocalDate {
    if (!strDate) return null;

    return LocalDate.parse(strDate, DateCalculator.DATE_FORMATTER);
  }

  static toLocalDateTimeBy(strDate: string): LocalDateTime {
    if (!strDate) return null;

    return LocalDateTime.parse(strDate, DateCalculator.DATE_TIME_FORMATTER);
  }
}
