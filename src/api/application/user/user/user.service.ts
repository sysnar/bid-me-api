import { Injectable } from '@nestjs/common';

import { IUserId, IUserReponse, UserCreateDTO, UserUpdateDTO } from '../../../../api/structure/IUser';
import { User } from '../../../../models/user/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOne(id: IUserId): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createOne(user: UserCreateDTO): Promise<User> {
    const createUser = this.userRepository.create(user);
    return await this.userRepository.save<User>(createUser);
  }

  async updateOne(id: IUserId, user: UserUpdateDTO): Promise<User> {
    await this.userRepository.update(id, user);
    return await this.getOne(id);
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
