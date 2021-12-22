import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Admin } from '@app/models/user/Admin.entity';
import { AdminRepository } from './admin.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
    private userRepository: UserRepository,
  ) {}

  async findOneById(id: string): Promise<Admin> {
    return await this.adminRepository.findOne({ id });
  }

  async findOneByUserId(userId: string): Promise<Admin> {
    return await this.adminRepository.findByUserId(userId);
  }

  async create(userId: string): Promise<Admin> {
    const findUser = await this.userRepository.findOne(userId);
    const createAdmin = this.adminRepository.create({ user: findUser });
    return await this.adminRepository.save(createAdmin);
  }

  async delete(userId: string): Promise<boolean> {
    const findAdmin = await this.adminRepository.findByUserId(userId);

    if (!findAdmin) return false;

    await this.adminRepository.deleteByUserId(userId);
    return true;
  }
}
