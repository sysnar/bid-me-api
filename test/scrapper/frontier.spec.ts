import { Test, TestingModule } from '@nestjs/testing';
import { Frontier, DateCalculator } from '../../src/scrapper/scrapper.frontier';

describe('Scrapper Frontier (unit test)', () => {
  let frontier: Frontier;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Frontier, DateCalculator],
    }).compile();

    frontier = module.get<Frontier>(Frontier);
  });
  const naraURL = `http://www.g2b.go.kr/index.jsp`;

  it('should be defined', () => {
    expect(frontier).toBeDefined();
  });

  // it('should set dates', () => {
  //   frontier.main(naraURL);
  // });
});

describe('Scrapper Date Module - DateCalculator', () => {
  const dCalculator = new DateCalculator();
  const now = new Date();

  it(`should be Defined`, () => {
    expect(dCalculator).toBeDefined();
  });

  // it(`should return Today's date`, () => {
  //   expect(dCalculater.getToday).toEqual("asdf");
  // });

  it(`should return date after 6 Month`, () => {
    const date = new Date('2021-09-25T00:00:00.000Z');
    const after = new Date('2022-03-25T00:00:00.000Z');
    expect(dCalculator.add6Month(date)).toStrictEqual(after);
  });

  it(`should return date before 6 Month`, () => {
    const date = new Date('2021-09-25T00:00:00.000Z');
    const before = new Date('2021-03-25T00:00:00.000Z');
    expect(dCalculator.sub6Month(date)).toStrictEqual(before);
  });

  it(`should return formatted date string like : 2021/03/10`, () => {
    const date = new Date('2021-11-25T00:00:00.000Z');
    expect(dCalculator.searchDateWrapper([date])).toEqual(['2021/11/25']);
  });
});
