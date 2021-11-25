import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { FsExplorer } from './fsExplorer.model';
import { DateCalculator } from 'src/libs/date-calculator';

@Injectable()
export class Frontier {
  private readonly logger = new Logger(Frontier.name);
  private today: Date;
  private endOfDate: Date;
  private startOfDate: Date;
  private _path: string;

  constructor(private dateCalculater: DateCalculator, private fsExplorer: FsExplorer) {
    this.today = this.dateCalculater.getTodayStr();
    // this.endOfDate = this.dateCalculater.add6Month(this.today);
    // this.startOfDate = this.dateCalculater.sub6Month(this.today);
    this.startOfDate = new Date('2021-01-01');
    this.endOfDate = new Date('2021-05-31');
    this._path = 'results';
  }

  // 현재일을 기준으로 앞 6개월, 뒷 6개월의 데이터를 수집
  // scrapp data : +6 M ~ today ~ -6 M
  async main(init: string, option = { headless: true }) {
    try {
      const [scrapStartDate, scrapEndDate] = this.dateCalculater.searchDateWrapper([this.startOfDate, this.endOfDate]);
      this.logger.log(`Start Scrapping Nara from ${scrapStartDate} to ${scrapStartDate}`);
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
      await mainPage.goto(init);
      await mainPage.waitForNavigation({ waitUntil: 'networkidle0' });

      mainPage.on('dialog', async (dialog) => {
        await dialog.dismiss();
      });

      await mainPage.evaluate(
        (dates) => {
          let startDate = <HTMLInputElement>document.getElementById('fromBidDt');
          startDate.value = dates[0];
          let endDate = <HTMLInputElement>document.getElementById('toBidDt');
          endDate.value = dates[1];
        },
        [scrapStartDate, scrapEndDate],
      );

      await Promise.all([mainPage.click('.btn_dark'), mainPage.waitForNavigation({ waitUntil: 'networkidle0' })]);
      const frames = await mainPage.frames().find((frame) => frame.name() === 'main');

      while (true) {
        const elementHandles: puppeteer.ElementHandle<Element>[] = await frames.$$('.tl > div > a');
        const propertyJsHandles = await Promise.all(
          elementHandles.map(async (handle): Promise<string> => {
            const href = await handle.getProperty('href').then((handle) => handle.jsonValue());
            const title = await handle.getProperty('innerText').then((handle) => handle.jsonValue());
            return title + ',' + href;
          }),
        );
        // const propertyJsHandles = await Promise.all(elementHandles.map((handle) => handle.getProperty('href')));
        // const hrefs = await Promise.all<string>(propertyJsHandles.map((handle) => handle.jsonValue()));

        if (propertyJsHandles == null) break;

        this.fsExplorer.checkDir(this._path);
        this.fsExplorer.checkFile(this._path, ['queue.txt', 'crawled.txt']);
        this.fsExplorer.writeFile(this._path, 'queue.txt', propertyJsHandles);

        await Promise.all([frames.click('a.default'), frames.waitForNavigation({ waitUntil: 'networkidle0' })]);
      }

      await mainPage.close();
      await browser.close();
    } catch (error) {
      this.logger.error(`Frontier main Error : ${error}`);
    }
  }
}
