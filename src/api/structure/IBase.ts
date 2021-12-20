import { IsNotEmpty, IsString } from 'class-validator';

export class IBaseId {
  @IsString()
  @IsNotEmpty()
  id: string;
}
