import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BidBookmark } from '../bid/Bid.Bookmark.entity';
import { BidViews } from '../bid/Bid.Views.entity';
import { Admin } from './Admin.entity';
import { Group } from './Group.entity';
import { Monitor } from './monitor.entity';
import { RecomandKeyword } from './RecomandKeyword.entity';

/*
 * 본 Entity는 현재 Typescript 컴파일러의 오류로 User.entity.ts -> user.entity.ts로 변경되고 있습니다.
 * 추후 해당 에러를 해결하여 파일의 명칭을 User.entity.ts로 변경하여야 합니다.
 *
 * 사용자의 정보를 저장하며, 사용자들이 선택한 여러 부가기능들의 설정을 가리키는 테이블입니다.
 */
@Entity()
export class User extends BaseEntity {
  // 사용자 ID
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  // 사용자명
  @Column()
  public readonly name: string;

  // 사용자 이메일
  @Column()
  public readonly email: string;

  // 사용자 비밀번호
  @Column()
  public readonly password: string;

  // 사용자 관리자 여부
  @OneToOne(() => Admin, (admin) => admin.user)
  public admin: Admin;

  // 사용자 소속 그룹
  @OneToOne(() => Group, (group) => group.user)
  public group: Group;

  // 사용자 관심 키워드 리스트
  @OneToMany(() => RecomandKeyword, (recomandKeyword) => recomandKeyword.user)
  public keyword: RecomandKeyword[];

  // 사용자 관심 입찰공고 책갈피
  @OneToMany(() => BidBookmark, (bookmark) => bookmark.user)
  public bookmark: BidBookmark[];

  // 사용자가 조회한 입찰공고 리스트
  @OneToMany(() => BidViews, (views) => views.user)
  public views: BidViews[];

  // 그룹에 소속되어 있지 않은 경우 사용자의 모니터링 정보
  @OneToOne(() => Monitor, (monitor) => monitor.user)
  public monitor: Monitor;

  // 사용자 가입 일시
  @Column()
  public created_dt: Date;

  // 사용자 정보 업데이트 일시
  @Column()
  public updated_dt: Date;
}
