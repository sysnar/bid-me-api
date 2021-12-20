import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, { message: 'password only accepts english and numver' })
  password: string;
}
