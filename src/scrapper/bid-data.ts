export class BiDTable {
  bid_Id: number; // 입찰공고 ID : Partition key
  bid_No: number; // 입찰공고번호 : Sort Key
  info: {
    bid_Title: string; // 공고명
    type: string; // 공고종류
    anounce_apparatus: string; // 공고기관
    demand_apparatus: string; // 수요기관
    bid_effective_date: string; // 입찰개시일시
    bid_due_date: string; // 입찰마감일시
    link: string; // 공고링크
    estimated_amount: number; // 추정금액
    estimated_amount_vat: number; // 추정금액(부가세포함)
    current_status: BID_STATUS; //진행현황
  };
}

export enum BID_STATUS {
  complete = 'COMPLETE',
  inprocess = 'INPROCESS',
  waiting = 'WAITING',
}
