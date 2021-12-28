import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UserUpdateDTO } from '@app/api/structure/user/IUser';
import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { User } from '@app/models/user/user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private userService: UserService, //
    private logger: Logger,
  ) {}

  @Get()
  async getUser(@Body('id') id: string): Promise<ResponseEntity<User>> {
    try {
      const resData = await this.userService.findById(id);
      return ResponseEntity.OK_WITH(resData);
    } catch (error) {
      this.logger.log(`User GET - Get User ${JSON.stringify(id)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('해당하는 회원정보가 존재하지 않습니다.'),
      );
    }
  }

  @Put()
  async updateUser(@Body() user: UserUpdateDTO): Promise<ResponseEntity<User | string>> {
    try {
      return ResponseEntity.OK_WITH(await this.userService.update(user));
    } catch (error) {
      this.logger.error(`User Update ${JSON.stringify(user)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('회원정보 수정에 실패하였습니다.'),
      );
    }
  }

  @Delete()
  async deleteUser(@Body('id') id: string): Promise<ResponseEntity<boolean | string>> {
    try {
      const deleted = await this.userService.delete(id);
      console.log(deleted);
      if (deleted === false) {
        throw new BadRequestException('삭제할 회원 계정이 존재하지 않습니다.');
      }

      return ResponseEntity.OK('회원정보 삭제에 성공하였습니다.');
    } catch (error) {
      this.logger.error(`User Delete ${JSON.stringify(id)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('회원 삭제에 실패하였습니다.'),
      );
    }
  }
}
