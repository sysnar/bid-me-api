import { BidViews } from '@app/models/bid/Bid.Views.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BidViews)
export class ViewsRespository extends Repository<BidViews> {}
