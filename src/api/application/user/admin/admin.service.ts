import { Injectable } from '@nestjs/common';

import { Admin } from '@app/models/user/Admin.entity';
import { AdminRepository } from './admin.repository';
import { UserRepository } from '../user/user.repository';
import { IBaseId } from '@app/api/structure/IBase';

@Injectable()
export class AdminService {
  constructor(
    private adminRepository: AdminRepository, //
    private userRepository: UserRepository,
  ) {}

  async getAdmin(id: IBaseId): Promise<Admin> {
    return await this.adminRepository.findOne(id);
  }

  async createAdmin(userId: IBaseId): Promise<Admin> {
    const findUser = await this.userRepository.findOne(userId);
    const createAdmin = this.adminRepository.create({ user: findUser });
    return await this.adminRepository.save(createAdmin);
  }

  async deleteAdmin(userId: IBaseId): Promise<boolean> {
    const findAdmin = await this.adminRepository.findAdminByUserId(userId);

    if (!findAdmin) return false;

    await this.adminRepository.deleteAdminByUserId(userId);
    return true;
  }
}
