import { Injectable } from '@nestjs/common';

@Injectable()
export class DateCalculator {
  constructor() {}

  getTodayStr(): Date {
    return new Date();
  }

  add6Month(now: Date): Date {
    return new Date(now.setMonth(now.getMonth() + 6));
  }

  sub6Month(now: Date): Date {
    return new Date(now.setMonth(now.getMonth() - 6));
  }

  searchDateWrapper(dates: Date[]): string[] {
    return dates.map<string>((date: Date): string => {
      return date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getDate();
    });
  }
}
