import { Injectable } from "@nestjs/common";
import * as puppeteer from "puppeteer";
import * as fs from "fs";

@Injectable()
export class Frontier {
  constructor() {}

  // 현재일을 기준으로 앞 6개월, 뒷 6개월의 데이터를 수집
  // scrapp data : +6 M ~ today ~ -6 M
  async main(init: string, option = { headless: true }) {
    const browserOption = option;
    const broswer = await puppeteer.launch(browserOption);
    const page = await broswer.newPage();
    const response = await page.goto(init);

    // const result = await page.content();
    // fs.writeFileSync("result.txt", result);

    await page.close();
    await broswer.close();
  }

  async getToday() {
    return new Date().toLocaleDateString();
  }
}
