import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Monitor } from './monitor.entity';
import { User } from './user.entity';

/*
 * User Entity 중 특정 그룹에 포함된 User들을 관리하는 테이블입니다.
 */
@Entity()
export class Group extends BaseEntity {
  // 그룹 테이블 ID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 각 그룹별 명칭
  @Column()
  name: string;

  // 그룹 생성일시
  @Column()
  create_dt: Date;

  // 그룹 정보 업데이트 일시
  @Column()
  updated_dt: Date;

  // 해당하는 그룹의 입찰공고 모니터링 설정 ID
  @OneToOne(() => User, (user) => user.group)
  user: User;

  // 해당하는 그룹의 입찰공고 모니터링 설정 ID
  @OneToOne(() => Monitor, (monitor) => monitor.group)
  monitor: Monitor;
}
