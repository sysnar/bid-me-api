import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTimeEntity } from '../BaseTimeEntity';
import { Monitor } from './monitor.entity';
import { User } from './user.entity';

/*
 * User Entity 중 특정 그룹에 포함된 User들을 관리하는 테이블입니다.
 */
@Entity()
export class Group extends BaseTimeEntity {
  // 각 그룹별 명칭
  @Column()
  name: string;

  // 해당하는 그룹의 입찰공고 모니터링 설정 ID
  @OneToOne(() => User, (user) => user.group)
  @JoinColumn()
  user: User;

  // 해당하는 그룹의 입찰공고 모니터링 설정 ID
  @OneToOne(() => Monitor, (monitor) => monitor.group)
  @JoinColumn()
  monitor: Monitor;
}
