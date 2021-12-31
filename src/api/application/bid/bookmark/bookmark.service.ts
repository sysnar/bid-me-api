import { BookmarkCreateDTO } from '@app/api/structure/bid/IBookmark';
import { User } from '@app/models/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../../user/user/user.service';
import { BidDataService } from '../data/bid.data.service';
import { BookmarkRepository } from './bookmark.repository';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(BookmarkRepository)
    private bookmarkRepository: BookmarkRepository,

    private userService: UserService,
    private bidDataService: BidDataService,
  ) {}

  async findByUser(userEntity: User) {
    const { id } = userEntity;
    return await this.bookmarkRepository.findUserBookmark(id);
  }

  async create(bookmarkCreateDTO: BookmarkCreateDTO): Promise<void> {
    const { userId, bidId } = bookmarkCreateDTO;

    const bid = await this.bidDataService.findById(bidId);
    const user = await this.userService.findById(userId);

    const bookmark = this.bookmarkRepository.create({ bid, user });
    await this.bookmarkRepository.save(bookmark);
  }

  async rank() {
    return await this.bookmarkRepository.rank();
  }
}
