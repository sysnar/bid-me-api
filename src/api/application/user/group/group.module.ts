import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupController } from './group.controller';
import { GroupRepository } from './group.repository';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupRepository])],
  controllers: [GroupController],
  providers: [GroupService, Logger],
})
export class GroupModule {}
