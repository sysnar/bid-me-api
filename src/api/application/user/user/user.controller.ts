import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Post,
  Put,
} from '@nestjs/common';

import { UserCreateDTO, UserUpdateDTO } from '@app/api/structure/user/IUser';
import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';
import { User } from '@app/models/user/user.entity';
import { UserService } from './user.service';
import { IBaseId } from '@app/api/structure/IBase';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService, //
    private logger: Logger,
  ) {}

  @Get()
  async getOne(@Body() id: IBaseId): Promise<ResponseEntity<User>> {
    this.logger.log('User GET - Get User');
    const resData = await this.userService.getOne(id.id);
    return ResponseEntity.OK_WITH(resData);
  }

  @Post('signup')
  async createOne(@Body() user: UserCreateDTO): Promise<ResponseEntity<string>> {
    try {
      await this.userService.createOne(user);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.error(`User POST ${JSON.stringify(user)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('회원가입에 실패하였습니다.'),
      );
    }
  }

  @Put()
  async updateOne(@Body() user: UserUpdateDTO): Promise<ResponseEntity<User | string>> {
    try {
      return ResponseEntity.OK_WITH(await this.userService.updateOne(user));
    } catch (error) {
      this.logger.error(`User Update ${JSON.stringify(user)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('회원정보 수정에 실패하였습니다.'),
      );
    }
  }

  @Delete()
  async deleteOne(@Body() id: IBaseId): Promise<ResponseEntity<boolean | string>> {
    try {
      const deleted = await this.userService.deleteOne(id);

      if (deleted === true) {
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
