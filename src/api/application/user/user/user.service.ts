import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserCreateDTO, UserUpdateDTO } from '@app/api/structure/user/IUser';
import { User } from '@app/models/user/user.entity';
import { UserRepository } from './user.repository';
import { IBaseId } from '@app/api/structure/IBase';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async findByUserName(name: string) {
    return await this.userRepository.findOne({ where: { name } });
  }

  async findByUserId(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createOne(user: UserCreateDTO): Promise<User> {
    const createUser = this.userRepository.create(user);
    return await this.userRepository.save(createUser);
  }

  async updateOne(user: UserUpdateDTO): Promise<User> {
    const { id, ...updateUser } = user;
    await this.userRepository.update(id, updateUser);
    return await this.userRepository.findOne(id);
  }

  async deleteOne(id: IBaseId): Promise<boolean> {
    try {
      await this.userRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
