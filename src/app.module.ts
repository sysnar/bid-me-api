import { Module } from "@nestjs/common";
import { ScrapperModule } from "./scrapper/scrapper.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot(), ScrapperModule],
})
export class AppModule {}
