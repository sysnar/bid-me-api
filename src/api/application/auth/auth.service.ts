import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';

import { UserCreateDTO } from '@app/api/structure/user/IUser';
import { Cipher } from '@app/common/libs/cipher';
import { AuthCredentialDTO } from '@app/api/structure/IAuth';
import { ErrorEntity } from '@app/common/libs/error-entity/ErrorEntity';
import { UserService } from '../user/user/user.service';
import { AdminService } from '../user/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, //
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}

  async signUp(userCreateDTO: UserCreateDTO): Promise<void> {
    const { name, email, password } = userCreateDTO;
    const hashedPassword = await Cipher.ENCRYPT(password);

    await this.userService.create({ name, email, password: hashedPassword });
  }

  async signIn(authCredentialsDto: AuthCredentialDTO): Promise<{ accessToken: string }> {
    const { name } = authCredentialsDto;
    const user = await this.userService.findByName(name);
    const admin = await this.adminService.findOneByUserId(user.id);

    if (admin) {
      const adminId = admin.id;
      // Create Admin Token (Secret + Payload)
      const payload = { id: user.id, role: 'ADMIN', roleId: adminId }; // Must not contain important informations
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else if (user) {
      const userId = user.id;
      // Create User Token (Secret + Payload)
      const payload = { id: userId }; // Must not contain important informations
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw instanceToPlain(ErrorEntity.SERVICE_ERROR('400'));
    }
  }
}
