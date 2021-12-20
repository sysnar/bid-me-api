import { Injectable } from '@nestjs/common';

import { IUserId, IUserReponse, UserCreateDTO, UserUpdateDTO } from '@app/api/structure/user/IUser';
import { User } from '@app/models/user/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOne(id: IUserId): Promise<User> {
    return await this.userRepository.findOne(id);
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

  async deleteOne(id: IUserId): Promise<IUserReponse> {
    try {
      await this.userRepository.delete(id);
      return { deleted: true };
    } catch (error) {
      return { deleted: false };
    }
  }
}
