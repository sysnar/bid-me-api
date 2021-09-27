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
    try {
      const browserOption = option;
      const browser = await puppeteer.launch(browserOption);
      const dates = this.dateCalculater.searchDateWrapper([this.startOfDate, this.endOfDate]);

      // Listender to control new _blank window popup
      browser.on('targetcreated', async (target) => {
        if (target.type() !== 'page') return;

        const properOrigin = 'http://www.g2b.go.kr';
        const pageUrl = target.url();
        // if (new URL(pageUrl).origin === properOrigin) return;

        console.log(`Closing page ... ${pageUrl}...`);
        const newPage = await target.page();
        await newPage.close();
        console.log(`Page ... ${pageUrl} closed.`);
      });

      const [mainPage] = await browser.pages();

      const response = await mainPage.goto(init);

      mainPage.on('dialog', async (dialog) => {
        console.log('LOG: Dialog poped', dialog);
        await dialog.dismiss();
      });

      await mainPage.evaluate(() => {
        let element = <HTMLInputElement>document.getElementById('fromBidDt');
        console.log(element);
        element.value = '1234';
      });
      await mainPage.screenshot({ path: 'screenshot.png' });

      await mainPage.close();
      await browser.close();
    } catch (error) {
      console.log(error);
    }
  }
}
