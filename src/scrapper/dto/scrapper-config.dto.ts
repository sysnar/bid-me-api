import { IsNotEmpty, IsString } from "class-validator";

export class ScrapperConfigDto {
  @IsNotEmpty()
  @IsString()
  initURL: string;
}
