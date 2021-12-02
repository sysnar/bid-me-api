import { IsNumber, IsString } from 'class-validator';

export class RequestG2bApiDataDTO {
  @IsString()
  inqryDiv = '1';

  @IsString()
  inqryBgnDt = '202101010000';

  @IsString()
  inqryEndDt = '202106300000';

  @IsString()
  type = 'json';

  @IsNumber()
  pageNo = 1;

  @IsNumber()
  numOfRows = 100;

  @IsString()
  ServiceKey = process.env.API_KEY;
}
