import { Logger, Module } from '@nestjs/common';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';

@Module({
  providers: [AdminService, AdminRepository, Logger],
  controllers: [AdminController],
})
export class AdminModule {}
