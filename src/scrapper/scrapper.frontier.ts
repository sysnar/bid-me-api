import { Injectable, Logger } from '@nestjs/common';
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
export class FsExplorer {
  private readonly logger = new Logger(FsExplorer.name);
  constructor() {}

  checkDir(path: string) {
    if (!fs.existsSync(path)) {
      this.logger.log(`Result directory doesn't exits`);
      this.logger.log(`Creating directory results...`);
      fs.mkdirSync(path);
    }
  }

  checkFile(path: string, files: string[]) {
    files.forEach((file) => {
      let fullPath = `${path}/${file}`;
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, '');
      }
    });
  }

  writeFile(path: string, file: string, links: string[]) {
    let fullPath = `${path}/${file}`;
    for (let link of links) {
      fs.appendFileSync(fullPath, link + '\n');
    }
  }
}

@Injectable()
export class Frontier {
  private readonly logger = new Logger(Frontier.name);
  private today: Date;
  private endOfDate: Date;
  private startOfDate: Date;
  private _path: string;

  constructor(private dateCalculater: DateCalculator, private fsExplorer: FsExplorer) {
    this.today = this.dateCalculater.getTodayStr();
    this.endOfDate = this.dateCalculater.add6Month(this.today);
    this.startOfDate = this.dateCalculater.sub6Month(this.today);
    this._path = 'results';
  }

  // 현재일을 기준으로 앞 6개월, 뒷 6개월의 데이터를 수집
  // scrapp data : +6 M ~ today ~ -6 M
  async main(init: string, option = { headless: true }) {
    try {
      const dates = this.dateCalculater.searchDateWrapper([this.startOfDate, this.endOfDate]);
      const browserOption = option;
      const browser = await puppeteer.launch(browserOption);

      // Listender to control new _blank window popup
      browser.on('targetcreated', async (target) => {
        if (target.type() !== 'page') return;

        const pageUrl = target.url();

        const newPage = await target.page();
        await newPage.close();
      });

      const [mainPage] = await browser.pages();

      const response = await mainPage.goto(init);

      mainPage.on('dialog', async (dialog) => {
        await dialog.dismiss();
      });

      await mainPage.evaluate((dates) => {
        let startDate = <HTMLInputElement>document.getElementById('fromBidDt');
        startDate.value = dates[0];
        let endDate = <HTMLInputElement>document.getElementById('toBidDt');
        endDate.value = dates[1];
      }, dates);

      await Promise.all([mainPage.click('.btn_dark'), mainPage.waitForNavigation({ waitUntil: 'networkidle0' })]);
      const frames = await mainPage.frames().find((frame) => frame.name() === 'main');

      let elementHandles = await frames.$$('.tl > div > a');
      const propertyJsHandles = await Promise.all(elementHandles.map((handle) => handle.getProperty('href')));
      const hrefs = await Promise.all<string>(propertyJsHandles.map((handle) => handle.jsonValue()));

      await this.fsExplorer.checkDir(this._path);
      await this.fsExplorer.checkFile(this._path, ['queue.txt', 'crawled.txt']);

      this.fsExplorer.writeFile(this._path, 'queue.txt', hrefs);

      await mainPage.close();
      await browser.close();
    } catch (error) {
      this.logger.error(`Frontier main Error : ${error}`);
    }
  }
}
