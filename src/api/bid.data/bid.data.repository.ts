import { EntityRepository, Repository } from 'typeorm';
import { BidData } from '../../models/bid/bid.data.entity';

@EntityRepository(BidData)
export class BidDataRepository extends Repository<BidData> {}
