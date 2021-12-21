import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GroupCreateDTO, GroupUpdateDTO } from '@app/api/structure/user/IGroup';
import { GroupRepository } from './group.repository';
import { IBaseId } from '@app/api/structure/IBase';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
  ) {}

  async getGroup(userId: IBaseId) {
    return this.groupRepository.findOne();
  }

  async createGroup(group: GroupCreateDTO) {
    const findGroup = await this.groupRepository.findOne({ where: [{ name: group.name }] });
    const createGroup = this.groupRepository.create(group);

    if (Object.keys(findGroup).length > 0) {
      throw new BadRequestException('이미 존재하는 그룹명입니다.');
    }

    return await this.groupRepository.save(createGroup);
  }

  async updateGroup(group: GroupUpdateDTO) {
    const { id, ...updateGroup } = group;
    await this.groupRepository.update(id, updateGroup);
    return await this.groupRepository.findOne(id);
  }

  async deleteGroup(userId: IBaseId): Promise<boolean> {
    const findGroup = await this.groupRepository.findOne(userId);

    if (!findGroup) return false;

    await this.groupRepository.delete(userId);
    return true;
  }
}
