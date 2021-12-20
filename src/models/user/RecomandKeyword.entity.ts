import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

/*
 * 사용자에게 입찰공고를 추천하기 위한 키워드 정보를 저장하는 테이블입니다.
 */
@Entity()
export class RecomandKeyword {
  // 각 키워드의 ID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 키워드명
  @Column()
  keyword: string;

  // 해당 키워드를 사용하는 사용자
  @ManyToOne(() => User, (user) => user.keyword)
  user: User;
}
