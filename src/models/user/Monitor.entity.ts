import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './Group.entity';
import { User } from './user.entity';

/*
 * Group Entity가 가지는 모니터링 룰을 저장하는 테이블입니다.
 */
@Entity()
export class Monitor extends BaseEntity {
  // 모니터링 테이블 ID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 모니터링이 동작하는 시간(텀)
  @Column()
  term: string;

  /* 모니터링 룰의 종류
   * @type - 'WEECKLY' | 'MONTHLY
   */
  @Column()
  type: string;

  // 모티터링 룰에 적용받는 유저
  @OneToOne(() => User, (user) => user.monitor)
  user: User;

  // 모티터링 룰에 적용받는 그룹
  @OneToOne(() => Group, (group) => group.monitor)
  group: Group;
}
