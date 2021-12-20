import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';

import { AuthCredentialDTO } from '@app/api/structure/IAuth';
import { AuthService } from './auth.service';
import { UserCreateDTO } from '@app/api/structure/user/IUser';
import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private logger: Logger) {}

  @Post('/signup')
  async signUp(@Body() userCreateDTO: UserCreateDTO) {
    try {
      await this.authService.signUp(userCreateDTO);
      return ResponseEntity.OK_WITH('회원가입에 성공하였습니다.');
    } catch (error) {
      this.logger.error(`Auth - SIGNUP ${userCreateDTO}`, error);

      if (error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentialDTO: AuthCredentialDTO,
  ): Promise<ResponseEntity<{ accessToken: string }>> {
    const accesToken = await this.authService.signIn(authCredentialDTO);
    return ResponseEntity.OK_WITH(accesToken, '로그인에 성공하였습니다.');
  }
}
