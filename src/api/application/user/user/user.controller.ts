import { Controller, Get, HttpCode, Logger } from '@nestjs/common';
import { ResponseEntity } from 'src/common/libs/res-entity/ResponseEntity';
import { User } from 'src/models/user/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService, //
    private logger: Logger,
  ) {}

  @Get()
  async getAllUser(): Promise<ResponseEntity<User[]>> {
    this.logger.log('User GET Request');
    return ResponseEntity.OK_WITH(await this.userService.getAll());
  }
}
