import { Group } from '@app/models/user/Group.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {}
