import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { getConfigModule, getTypeORMModule } from './config';
import { BidDataModule } from './api/application/bid/data/bid.data.module';
import { UserModule } from './api/application/user/user/user.module';
import { AdminModule } from './api/application/user/admin/admin.module';
import { ExceptionTransformFilter } from './common/filters/exception-transform.filter';
import { GroupModule } from './api/application/user/group/group.module';
import { KeywordModule } from './api/application/user/keyword/keyword.module';
import { AuthModule } from './api/application/auth/auth.module';
import { BookmarkModule } from './api/application/bid/bookmark/bookmark.module';
import { ViewsModule } from './api/application/bid/views/views.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    getConfigModule(),
    getTypeORMModule(),
    BidDataModule,
    UserModule,
    AdminModule,
    GroupModule,
    KeywordModule,
    AuthModule,
    BookmarkModule,
    ViewsModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: ExceptionTransformFilter }],
})
export class AppModule {}
