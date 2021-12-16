import { EntityRepository, Repository } from 'typeorm';

import { BidData } from '@app/models/bid/Bid.Data.entity';

@EntityRepository(BidData)
export class BidDataRepository extends Repository<BidData> {}
