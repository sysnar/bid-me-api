import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../../user/user/user.module';
import { BidDataModule } from '../data/bid.data.module';
import { ViewsController } from './views.controller';
import { ViewsRespository } from './views.repository';
import { ViewsService } from './views.service';

@Module({
  imports: [TypeOrmModule.forFeature([ViewsRespository]), UserModule, BidDataModule],
  controllers: [ViewsController],
  providers: [ViewsService, Logger],
})
export class ViewsModule {}
