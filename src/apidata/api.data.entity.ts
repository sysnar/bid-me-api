import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApiDataRepository {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bidNtceNo: string; // 입찰공고 ID

  @Column()
  bidNtceOrd: string; // 입찰공고 차수

  @Column()
  reNtceYn: string; // 재공고 여부

  @Column()
  bidNtceDt: Date; // '2021-04-23 08:28:00' -> 입찰공고가 공고된 일시 YYYY-MM-YY HH:MM:SS

  @Column()
  bidNtceNm: string; // 입찰공고명

  @Column()
  ntceInsttNm: string; // 공고기관명

  @Column()
  dminsttNm: string; // 수요기관명

  @Column()
  bidMethdNm: string; // 입찰방식명

  @Column()
  cntrctCnclsMthdNm: string; // 체결방법명

  @Column()
  bidQlfctRgstDt: Date; // 입찰 참가자격 등록 마감일시

  @Column()
  bidBeginDt: Date; // 입찰개시 일시

  @Column()
  bidClseDt: Date; // 입찰마감 일시

  @Column()
  opengDt: Date; // 개찰일시

  @Column()
  rbidPermsnYn: string; // 입찰이 유찰되는 경우 재공고 없이 다시 입찰 (Y/N)

  @Column()
  bidPrtcptLmtYn: BidBoolean; // 입찰참가제한 여부(Y/N)

  @Column()
  asignBdgtAmt: number; // 배정예산금액

  @Column()
  presmptPrce: number; // 추정가격

  @Column()
  opengPlce: string; // 개찰장소

  @Column()
  bidNtceDtlUrl: string; // 입찰공고 상세 URL

  @Column()
  srvceDivNm: string; // 용역구분명

  @Column()
  rgstDt: Date; // 공고의 등록일시

  @Column()
  bfSpecRgstNo: number; // 사전규격 등록번호

  @Column()
  sucsfbidMthdNm: string; // 낙찰 방법명

  @Column()
  chgDt: Date; // 공고의 변경일시

  @Column()
  indstrytyLmtYn: BidBoolean; // 업종제한 여부

  @Column()
  chgNtceRsn: string; // 변경공고사유

  @Column()
  rbidOpengDt: Date; // 재입찰 개찰 일시
}

export enum BidBoolean {
  YES = 'Y',
  NO = 'N',
}
