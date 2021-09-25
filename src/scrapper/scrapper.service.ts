import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ScrapperConfigDto } from "./dto/scrapper-config.dto";
import { Frontier } from "./scrapper.frontier";

@Injectable()
export class ScrapperService {
  private readonly logger = new Logger(ScrapperService.name);

  constructor(private frontier: Frontier) {}

  async initScrap(scrappercConfigDto: ScrapperConfigDto) {
    return this.frontier.main(scrappercConfigDto.initURL);
  }

  //   @Cron(CronExpression.EVERY_10_SECONDS)
  //   handleCron() {
  //     this.logger.debug(`Called when 10 seconds have passed`);
  //   }
}
