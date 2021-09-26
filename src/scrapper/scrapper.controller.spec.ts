import { Test, TestingModule } from "@nestjs/testing";
import { ScrapperController } from "./scrapper.controller";
import { Frontier } from "./scrapper.frontier";
import { ScrapperService } from "./scrapper.service";

describe("ScrapperController", () => {
  let controller: ScrapperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapperController],
      providers: [ScrapperService, Frontier],
    }).compile();

    controller = module.get<ScrapperController>(ScrapperController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
