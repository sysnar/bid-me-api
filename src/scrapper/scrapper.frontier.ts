import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

@Injectable()
export class DateCalculator {
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

@Injectable()
export class Frontier {
  private today: Date;
  private endOfDate: Date;
  private startOfDate: Date;

  constructor(private dateCalculater: DateCalculator) {
    this.today = this.dateCalculater.getTodayStr();
    this.endOfDate = this.dateCalculater.add6Month(this.today);
    this.startOfDate = this.dateCalculater.sub6Month(this.today);
  }

  // 현재일을 기준으로 앞 6개월, 뒷 6개월의 데이터를 수집
  // scrapp data : +6 M ~ today ~ -6 M
  async main(init: string, option = { headless: true }) {
    const browserOption = option;
    const broswer = await puppeteer.launch(browserOption);
    const page = await broswer.newPage();
    const response = await page.goto(init);
    const dates = this.dateCalculater.searchDateWrapper([this.startOfDate, this.endOfDate]);

    page.setViewport({
      width: 1024,
      height: 768,
    });

    page.on('dialog', async (dialog) => {
      console.log('LOG: Dialog poped', dialog);
      await dialog.dismiss();
    });

    // page.$eval(
    //   '#instNm',
    //   (element: Element) => {
    //     element.value = '2021/08/10';
    //     return element.value;
    //   },
    //   dates,
    // );
    await page.evaluate(() => {
      let element = <HTMLInputElement>document.getElementById('#instNm');
      element.value = '1234';
    });
    await page.screenshot({ path: 'screenshot.png' });
    // fs.writeFileSync("result.txt", result);

    await page.close();
    await broswer.close();
  }
}
