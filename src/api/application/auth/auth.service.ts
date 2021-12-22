import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';

import { UserCreateDTO } from '@app/api/structure/user/IUser';
import { Cipher } from '@app/common/libs/cipher';
import { AuthCredentialDTO } from '@app/api/structure/IAuth';
import { ErrorEntity } from '@app/common/libs/error-entity/ErrorEntity';
import { UserService } from '../user/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, //
    private jwtService: JwtService,
  ) {}

  async signUp(userCreateDTO: UserCreateDTO): Promise<void> {
    const { name, email, password } = userCreateDTO;
    const hashedPassword = await Cipher.ENCRYPT(password);

    await this.userService.createOne({ name, email, password: hashedPassword });
  }

  async signIn(authCredentialsDto: AuthCredentialDTO): Promise<{ accessToken: string }> {
    const { name } = authCredentialsDto;
    const user = await this.userService.findByUserName(name);

    if (user) {
      // Create User Token (Secret + Payload)
      const payload = { id: user.id }; // Must not contain important informations
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw instanceToPlain(ErrorEntity.SERVICE_ERROR('400'));
    }
  }
}
