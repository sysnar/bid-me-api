import { Body, Controller, Delete, Get, InternalServerErrorException, Logger, Post, Put, UseFilters } from '@nestjs/common';

import { IUserId, IUserReponse, UserCreateDTO, UserUpdateDTO } from '@app/api/structure/IUser';
import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';
import { User } from '@app/models/user/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService, //
    private logger: Logger,
  ) {}

  @Get()
  async getOne(@Body() id: IUserId): Promise<ResponseEntity<User>> {
    this.logger.log('User GET - Get User');
    return ResponseEntity.OK_WITH(await this.userService.getOne(id));
  }

  @Post('signup')
  async createOne(@Body() user: UserCreateDTO): Promise<ResponseEntity<string>> {
    try {
      await this.userService.createOne(user);
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.error(`User POST ${JSON.stringify(user)}`, error);
      throw new InternalServerErrorException(ResponseEntity.ERROR_WITH('회원가입에 실패하였습니다.'));
    }
  }

  @Put()
  async updateOne(@Body() user: UserUpdateDTO): Promise<ResponseEntity<User | string>> {
    try {
      return ResponseEntity.OK_WITH(await this.userService.updateOne(user));
    } catch (error) {
      this.logger.error(`User Update ${JSON.stringify(user)}`, error);
      throw new InternalServerErrorException(ResponseEntity.ERROR_WITH('회원정보 수정에 실패하였습니다.'));
    }
  }

  @Delete()
  async deleteOne(@Body() id: IUserId): Promise<ResponseEntity<IUserReponse | string>> {
    try {
      return ResponseEntity.OK_WITH(await this.userService.deleteOne(id));
    } catch (error) {
      this.logger.error(`User Delete ${JSON.stringify(id)}`, error);
      throw new InternalServerErrorException(ResponseEntity.ERROR_WITH('회원 삭제에 실패하였습니다.'));
    }
  }
}
