import { EntityRepository, Repository } from 'typeorm';
import { BidData } from '../../../../models/bid/Bid.Data.entity';

@EntityRepository(BidData)
export class BidDataRepository extends Repository<BidData> {}
