import { Injectable } from '@nestjs/common';
import { FsExplorer } from './fsExplorer.model';
import axios from 'axios';
import { Iconv } from 'iconv';
import cheerio from 'cheerio';

@Injectable()
export class Agent {
  private _queue;
  private iconv;
  constructor(private fsExplorer: FsExplorer) {
    this.iconv = new Iconv('EUC-KR', 'utf-8//translit//ignore');
  }

  // Scrap bid data from queue
  readQueue(path: string, file: string): string[] {
    this._queue = this.fsExplorer.fileToArray(path, file);
    return this.fsExplorer.fileToArray(path, file);
  }

  async getHTML(url) {
    try {
      const { data } = await axios.get(url, { responseType: 'arraybuffer' });
      return this.iconv.convert(data).toString();
    } catch (error) {
      console.log(error);
    }
  }

  async scrapData(queue: string[]) {
    for (let line of queue) {
      let [title, url] = line.split(',');

      // Store bid data to crawlled.txt & DB
      const pageData = await this.getHTML(url);
      const $ = cheerio.load(pageData);
      // const sDate = $('#inForm > div:nth-child(9) > table > tbody > tr:nth-child(1) > td:nth-child(2) > div');
      // console.log(sDate.text().trim());
    }
    // update data in crawled.txt
  }
}
