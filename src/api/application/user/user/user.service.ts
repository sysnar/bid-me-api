import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserCreateDTO, UserUpdateDTO } from '@app/api/structure/user/IUser';
import { User } from '@app/models/user/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByName(name: string): Promise<User> {
    return await this.userRepository.findOne({ where: { name } });
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(user: UserCreateDTO): Promise<User> {
    const createUser = this.userRepository.create(user);
    return await this.userRepository.save(createUser);
  }

  async update(user: UserUpdateDTO): Promise<User> {
    const { id, ...updateUser } = user;
    await this.userRepository.update(id, updateUser);
    return await this.userRepository.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    try {
      const foundUser = await this.findById(id);

      if (Object.keys(foundUser).length <= 0) return false;

      await this.userRepository.delete({ id });
      return true;
    } catch (error) {
      return false;
    }
  }
}
