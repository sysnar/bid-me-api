import { Controller, Logger } from '@nestjs/common';

import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  // prettier-ignore
  constructor(
    private logger: Logger, 
    private adminService: AdminService
  ) {}
}
