import { Controller, Delete, Get, Logger, Post, Put } from '@nestjs/common';
import { IUserId, IUserReponse, UserCreateDTO } from '../../../../api/structure/IUser';
import { ResponseEntity } from '../../../../common/libs/res-entity/ResponseEntity';
import { User } from '../../../../models/user/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService, //
    private logger: Logger,
  ) {}

  @Get()
  async getOne(id: IUserId): Promise<ResponseEntity<User>> {
    this.logger.log('User GET - Get User');
    return ResponseEntity.OK_WITH(await this.userService.getOne(id));
  }

  @Post('signup')
  async createOne(user: UserCreateDTO): Promise<ResponseEntity<string>> {
    try {
      await this.userService.updateOne;
      return ResponseEntity.OK();
    } catch (error) {
      this.logger.error(`User POST ${JSON.stringify(user)}`, error);
      return ResponseEntity.ERROR_WITH('회원가입에 실패하였습니다.');
    }
  }

  @Put()
  async updateOne(id: IUserId, user: UserCreateDTO): Promise<ResponseEntity<User | string>> {
    try {
      return ResponseEntity.OK_WITH(await this.userService.updateOne(id, user));
    } catch (error) {
      this.logger.error(`User Update ${JSON.stringify(user)}`, error);
      return ResponseEntity.ERROR_WITH('회원정보 수정에 실패하였습니다.');
    }
  }

  @Delete()
  async deleteOne(id: IUserId): Promise<ResponseEntity<IUserReponse | string>> {
    try {
      return ResponseEntity.OK_WITH(await this.userService.deleteOne(id));
    } catch (error) {
      this.logger.error(`User Delete ${JSON.stringify(id)}`, error);
      return ResponseEntity.ERROR_WITH('회원 삭제에 실패하였습니다.');
    }
  }
}
