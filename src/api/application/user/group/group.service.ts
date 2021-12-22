import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GroupCreateDTO, GroupUpdateDTO } from '@app/api/structure/user/IGroup';
import { GroupRepository } from './group.repository';
import { Group } from '@app/models/user/Group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
  ) {}

  async findOneById(id: string): Promise<Group> {
    return this.groupRepository.findOne({ id });
  }

  async create(group: GroupCreateDTO): Promise<Group> {
    const findGroup = await this.groupRepository.findOne({ where: [{ name: group.name }] });
    const createGroup = this.groupRepository.create(group);

    if (Object.keys(findGroup).length > 0) {
      throw new BadRequestException('이미 존재하는 그룹명입니다.');
    }

    return await this.groupRepository.save(createGroup);
  }

  async update(group: GroupUpdateDTO): Promise<Group> {
    const { id, ...updateGroup } = group;
    await this.groupRepository.update(id, updateGroup);
    return await this.groupRepository.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    const findGroup = await this.groupRepository.findOne({ id });

    if (!findGroup) return false;

    await this.groupRepository.delete(id);
    return true;
  }
}
