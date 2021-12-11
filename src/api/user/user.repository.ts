import { EntityRepository, Repository } from 'typeorm';

import { User } from 'src/models/user/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
