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

  parseText(plainText: String) {
    const a = plainText.split('\t');
    return;
  }

  async scrapData(queue: string[]) {
    for (let url of queue) {
      // Store bid data to crawlled.txt & DB
      const pageData = await this.getHTML(url);
      const $ = cheerio.load(pageData);
      const title = $('#container > div:nth-child(8) > table > tbody > tr:nth-child(3) > td > div');
      console.log(title.text().trim().split(' '));
    }
    // update data in crawled.txt
  }
}
