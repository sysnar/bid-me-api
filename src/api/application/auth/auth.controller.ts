import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthCredentialDTO } from '@app/api/structure/IAuth';
import { AuthService } from './auth.service';
import { UserCreateDTO } from '@app/api/structure/user/IUser';
import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';
import { ResponseStatus } from '@app/common/libs/res-entity/ResponseStatus';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private logger: Logger) {}

  @Post('/signup')
  async signUp(@Body() userCreateDTO: UserCreateDTO) {
    try {
      await this.authService.signUp(userCreateDTO);
      return ResponseEntity.OK_WITH('회원가입에 성공하였습니다.');
    } catch (error) {
      this.logger.error(`Auth - SIGNUP ${JSON.stringify(userCreateDTO)}`, error);

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
    try {
      const accesToken = await this.authService.signIn(authCredentialDTO);
      return ResponseEntity.OK_WITH(accesToken, '로그인에 성공하였습니다.');
    } catch (error) {
      this.logger.error(`Auth - SIGNIN ${JSON.stringify(authCredentialDTO)}`, error);

      if (error.code === '400') {
        throw new BadRequestException(
          ResponseEntity.ERROR_WITH(
            '로그인 정보가 올바르지 않습니다.',
            ResponseStatus.BAD_PARAMETER,
          ),
        );
      } else {
        throw new InternalServerErrorException(
          ResponseEntity.ERROR_WITH('서버 오류로 인해 로그인에 실패하였습니다.'),
        );
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logOut() {
    console.log('success');
    return '123';
  }
}
