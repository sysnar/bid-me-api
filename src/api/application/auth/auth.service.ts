import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UserCreateDTO } from '@app/api/structure/user/IUser';
import { UserRepository } from '../user/user/user.repository';
import { Cipher } from '@app/common/libs/cipher';
import { AuthCredentialDTO } from '@app/api/structure/IAuth';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userCreateDTO: UserCreateDTO): Promise<void> {
    const { name, email, password } = userCreateDTO;

    const hashedPassword = await Cipher.ENCRYPT(password);
    const user = this.userRepository.create({ name, email, password: hashedPassword });
    await this.userRepository.save(user);
  }

  async signIn(authCredentialsDto: AuthCredentialDTO): Promise<{ accessToken: string }> {
    const { name } = authCredentialsDto;
    const user = await this.userRepository.findOne({ name });

    if (user && (await bcrypt)) {
      // Create User Token (Secret + Payload)
      const payload = { name }; // Must not contain important informations
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
