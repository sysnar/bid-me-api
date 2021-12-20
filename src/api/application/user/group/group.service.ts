import { BadRequestException, Injectable } from '@nestjs/common';

import { GroupCreateDTO, GroupUpdateDTO, IGroupId } from '@app/api/structure/user/IGroup';
import { IUserId } from '@app/api/structure/user/IUser';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(private groupRepository: GroupRepository) {}

  async getGroup(userId: IUserId) {
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

  async deleteGroup(userId: IGroupId): Promise<boolean> {
    const findGroup = await this.groupRepository.findOne(userId);

    if (!findGroup) return false;

    await this.groupRepository.delete(userId);
    return true;
  }
}
