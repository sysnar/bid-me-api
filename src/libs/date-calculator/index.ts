import { Injectable } from '@nestjs/common';

@Injectable()
export class DateCalculator {
  private _addMonthNumber: number = 6;
  private _sumMonthNumber: number = 6;
  constructor() {}

  getTodayStr(): Date {
    return new Date();
  }

  set setAddMonth(addMonthNumber: number) {
    this._addMonthNumber = addMonthNumber;
  }

  set setSumMonth(sumMonthNumber: number) {
    this._sumMonthNumber = sumMonthNumber;
  }

  add6Month(now: Date): Date {
    return new Date(now.setMonth(now.getMonth() + this._addMonthNumber));
  }

  sub6Month(now: Date): Date {
    return new Date(now.setMonth(now.getMonth() - this._sumMonthNumber));
  }

  searchDateWrapper(dates: Date[]): string[] {
    return dates.map<string>((date: Date): string => {
      return date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getDate();
    });
  }
}
