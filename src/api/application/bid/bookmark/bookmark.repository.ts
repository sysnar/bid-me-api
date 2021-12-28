import { BidBookmark } from '@app/models/bid/Bid.Bookmark.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BidBookmark)
export class BookmarkRepository extends Repository<BidBookmark> {}
