import { IsNumber } from 'class-validator';

export abstract class PageRequest {
  @IsNumber()
  pageNo: number = 1;

  @IsNumber()
  pageSize: number = 10;

  getOffset(): number {
    return (this.pageNo - 1) * this.pageSize;
  }

  getLimit(): number {
    return this.pageSize;
  }
}
