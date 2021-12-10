import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

/*
 * User Entity 중 관리자 권한을 포함한 유저를 나타내는 테이블입니다.
 */
@Entity()
export class Admin extends BaseEntity {
  // 관리자 테이블 ID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 관리자로 처음 등록된 일시
  @Column()
  created_dt: Date;

  // 관리자 정보가 업데이트 된 일시
  @Column()
  updated_dt: Date;

  // 관리자로 등록된 유저의 ID
  @OneToOne(() => User, (user) => user.admin)
  user: User;
}
