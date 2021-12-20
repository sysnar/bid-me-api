import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { User } from './user.entity';

/*
 * User Entity 중 관리자 권한을 포함한 유저를 나타내는 테이블입니다.
 */
@Entity()
export class Admin extends BaseTimeEntity {
  // 관리자로 등록된 유저의 ID
  @OneToOne(() => User, (user) => user.admin)
  @JoinColumn()
  user: User;
}
