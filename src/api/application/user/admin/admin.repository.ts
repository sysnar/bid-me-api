import { EntityRepository, Repository } from 'typeorm';

import { Admin } from '@app/models/user/Admin.entity';
import { IUserId } from '@app/api/structure/IUser';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  /*
   *  Admin 중 해당하는 User ID의 Admin 정보 조회
   */
  async findAdminByUserId(userId: IUserId): Promise<Admin> {
    return await this.createQueryBuilder('admin') //
      .where('user_id = :id', userId)
      .getOne();
  }

  /*
   *  Admin 중 해당하는 User ID의 Admin 정보를 삭제
   */
  async deleteAdminByUserId(userId: IUserId): Promise<void> {
    await this.createQueryBuilder('admin') //
      .delete()
      .where('user_id = :id', userId)
      .execute();
  }
}
