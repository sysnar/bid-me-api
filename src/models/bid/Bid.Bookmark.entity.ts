import { BaseEntity, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { BidData } from './Bid.Data.entity';

/*
 * 사용자가 관심입찰공고로 등록한 리스트를 저장하는 테이블입니다.
 */
@Entity()
export class BidBookmark {
  // 책갈피 ID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 관심공고를 등록한 사용자 ID
  @ManyToOne(() => User, (user) => user.bookmark)
  user: User;

  // 사욪가가 관심공고로 등록한 입찰공고
  @ManyToOne(() => BidData, (bid) => bid.bookmark)
  bid: BidData;
}
