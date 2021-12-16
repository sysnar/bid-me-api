import { EntityRepository, Repository } from 'typeorm';

import { User } from '@app/models/user/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
