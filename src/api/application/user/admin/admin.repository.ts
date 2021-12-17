import { EntityRepository, Repository } from 'typeorm';

import { Admin } from '@app/models/user/Admin.entity';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {}
