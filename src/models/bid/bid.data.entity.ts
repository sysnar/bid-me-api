import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BidBookmark } from './Bid.Bookmark.entity';
import { BidViews } from './Bid.Views.entity';

@Entity()
export class BidData extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column()
  public readonly bidNtceNo: string; // 입찰공고 ID

  @Column()
  public readonly bidNtceOrd: string; // 입찰공고 차수

  @Column()
  public readonly reNtceYn: BidBoolean; // 재공고 여부

  @Column()
  public readonly bidNtceDt: string; // '2021-04-23 08:28:00' -> 입찰공고가 공고된 일시 YYYY-MM-YY HH:MM:SS

  @Column()
  public readonly bidNtceNm: string; // 입찰공고명

  @Column()
  public readonly ntceInsttNm: string; // 공고기관명

  @Column()
  public readonly dminsttNm: string; // 수요기관명

  @Column()
  public readonly bidMethdNm: string; // 입찰방식명

  @Column()
  public readonly cntrctCnclsMthdNm: string; // 체결방법명

  @Column()
  public readonly bidQlfctRgstDt: string; // 입찰 참가자격 등록 마감일시

  @Column()
  public readonly bidBeginDt: string; // 입찰개시 일시

  @Column()
  public readonly bidClseDt: string; // 입찰마감 일시

  @Column()
  public readonly opengDt: string; // 개찰일시

  @Column()
  public readonly rbidPermsnYn: string; // 입찰이 유찰되는 경우 재공고 없이 다시 입찰 (Y/N)

  @Column()
  public readonly bidPrtcptLmtYn: BidBoolean; // 입찰참가제한 여부(Y/N)

  @Column()
  public readonly asignBdgtAmt: string; // 배정예산금액

  @Column()
  public readonly presmptPrce: string; // 추정가격

  @Column()
  public readonly opengPlce: string; // 개찰장소

  @Column()
  public readonly bidNtceDtlUrl: string; // 입찰공고 상세 URL

  @Column()
  public readonly srvceDivNm: string; // 용역구분명

  @Column()
  public readonly rgstDt: string; // 공고의 등록일시

  @Column()
  public readonly bfSpecRgstNo: string; // 사전규격 등록번호

  @Column()
  public readonly sucsfbidMthdNm: string; // 낙찰 방법명

  @Column()
  public readonly chgDt: string; // 공고의 변경일시

  @Column()
  public readonly indstrytyLmtYn: BidBoolean; // 업종제한 여부

  @Column()
  public readonly chgNtceRsn: string; // 변경공고사유

  @Column()
  public readonly rbidOpengDt: string; // 재입찰 개찰 일시

  @OneToMany(() => BidBookmark, (bookmark) => bookmark.bid)
  public bookmark: BidBookmark[];

  @OneToMany(() => BidViews, (views) => views.bid)
  public views: BidViews[];
}

export enum BidBoolean {
  YES = 'Y',
  NO = 'N',
}
