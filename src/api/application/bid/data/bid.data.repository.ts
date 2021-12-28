import { EntityRepository, Like, Repository } from 'typeorm';

import { BidData } from '@app/models/bid/Bid.Data.entity';
import { BidDataSearchDTO } from '@app/api/structure/bid/IBidData';

@EntityRepository(BidData)
export class BidDataRepository extends Repository<BidData> {
  paging(param: BidDataSearchDTO) {
    const queryBuilder = this.createQueryBuilder()
      .select(['bid.id', 'bid.bidNtceNm'])
      .from(BidData, 'bid')
      .limit(param.getLimit())
      .offset(param.getOffset());

    if (param.hasName()) {
      queryBuilder.andWhere('bid.bidNtceNm like :name', { name: `%${param.name}%` });
    }

    return queryBuilder.getManyAndCount();
  }
}
