import { Test, TestingModule } from "@nestjs/testing";
import { Frontier } from "./scrapper.frontier";
import { ScrapperService } from "./scrapper.service";

describe("ScrapperService", () => {
  let service: ScrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapperService, Frontier],
    }).compile();

    service = module.get<ScrapperService>(ScrapperService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
