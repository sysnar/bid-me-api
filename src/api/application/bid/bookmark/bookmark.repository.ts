import { BidBookmark } from '@app/models/bid/Bid.Bookmark.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BidBookmark)
export class BookmarkRepository extends Repository<BidBookmark> {
  findUserBookmark(id: string) {
    const queryBuilder = this.createQueryBuilder('bookmark')
      .innerJoinAndSelect('bookmark.bid', 'bid')
      .select(['bid.id', 'bid.bidNtceDtlUrl', 'bid.bidNtceNm', 'bookmark.id'])
      .where('bookmark.user_id = :id', { id });

    return queryBuilder.getMany();
  }

  async rank() {
    const queryBuilder = this.createQueryBuilder('bookmark')
      .innerJoinAndSelect('bookmark.bid', 'bid')
      .select(['bid.id', 'bid.bidNtceNm'])
      .addSelect('COUNT(bid.id)')
      .groupBy('bid.id')
      .orderBy('count', 'DESC');

    return queryBuilder.getRawMany();
  }
}
