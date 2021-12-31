import { EntityRepository, Like, Repository } from 'typeorm';

import { BidData } from '@app/models/bid/Bid.Data.entity';
import { BidDataSearchDTO } from '@app/api/structure/bid/IBidData';
import { floor, random } from 'lodash';

@EntityRepository(BidData)
export class BidDataRepository extends Repository<BidData> {
  paging(param: BidDataSearchDTO) {
    const queryBuilder = this.createQueryBuilder()
      .select(['bid.id', 'bid.bidNtceNm'])
      .limit(param.getLimit())
      .offset(param.getOffset());

    if (param.hasName()) {
      queryBuilder.andWhere('bid.bidNtceNm like :name', { name: `%${param.name}%` });
    }

    return queryBuilder.getManyAndCount();
  }

  random() {
    const queryBuilder = this.createQueryBuilder('bid')
      .select(['bid.id', 'bid.bidNtceNm', 'bid.bidNtceDtlUrl']) //
      .orderBy('RANDOM()')
      .limit(5);

    return queryBuilder.getMany();
  }
}
