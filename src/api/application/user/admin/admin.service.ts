import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Admin } from '@app/models/user/Admin.entity';
import { AdminRepository } from './admin.repository';
import { UserRepository } from '../user/user.repository';
import { IBaseId } from '@app/api/structure/IBase';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
    private userRepository: UserRepository,
  ) {}

  async getAdmin(id: string): Promise<Admin> {
    return await this.adminRepository.findOne({ id });
  }

  async findByUserId(userId: string): Promise<Admin> {
    return await this.adminRepository.findAdminByUserId(userId);
  }

  async createAdmin(userId: string): Promise<Admin> {
    const findUser = await this.userRepository.findOne(userId);
    const createAdmin = this.adminRepository.create({ user: findUser });
    return await this.adminRepository.save(createAdmin);
  }

  async deleteAdmin(userId: string): Promise<boolean> {
    const findAdmin = await this.adminRepository.findAdminByUserId(userId);

    if (!findAdmin) return false;

    await this.adminRepository.deleteAdminByUserId(userId);
    return true;
  }
}
