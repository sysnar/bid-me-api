import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { BidData } from './Bid.Data.entity';

/*
 * 사용자들이 조회하는 입찰공고들의 조회수를 관리하는 테이블입니다.
 */
@Entity()
export class BidViews {
  // 조회수 ID
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  // 마지막으로 입찰공고가 조회된 시간
  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  public updatedDt: Date;

  // 조회된 입찰공고 ID
  @ManyToOne(() => BidData, (bid) => bid.views)
  public bid: BidData;

  // 조회한 사용자 ID
  @ManyToOne(() => User, (user) => user.views)
  public user: User;
}
