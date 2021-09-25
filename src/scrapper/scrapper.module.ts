import { Module } from "@nestjs/common";
import { ScrapperController } from "./scrapper.controller";
import { Frontier } from "./scrapper.frontier";
import { ScrapperService } from "./scrapper.service";

@Module({
  controllers: [ScrapperController],
  providers: [ScrapperService, Frontier],
})
export class ScrapperModule {}
