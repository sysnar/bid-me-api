import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../../user/user/user.module';
import { BidDataModule } from '../data/bid.data.module';
import { BookmarkController } from './bookmark.controller';
import { BookmarkRepository } from './bookmark.repository';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookmarkRepository]), UserModule, BidDataModule],
  controllers: [BookmarkController],
  providers: [BookmarkService, Logger],
})
export class BookmarkModule {}
