import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { ScrapperConfigDto } from "./dto/scrapper-config.dto";
import { ScrapperService } from "./scrapper.service";

@Controller("scrapper")
export class ScrapperController {
  private naraURL = `http://www.g2b.go.kr/index.jsp`;
  private readonly logger = new Logger(ScrapperService.name);
  constructor(private scrapperService: ScrapperService) {}

  @Post()
  initScrap(@Body() scrapperConfigDto: ScrapperConfigDto) {
    this.logger.debug(`Scrap init have called`);
    return this.scrapperService.initScrap(scrapperConfigDto);
  }
}
