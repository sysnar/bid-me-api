import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';

import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';
import { AdminService } from './admin.service';
import { IBaseId } from '@app/api/structure/IBase';

@Controller('admin')
export class AdminController {
  // prettier-ignore
  constructor(
    private logger: Logger, 
    private adminService: AdminService
  ) {}

  /*
   * @Body id - 사용자 계정 ID
   * 해당하는 userId의 Admin 정보를 반환
   */
  @Get()
  async getAdmin(@Body() userId: IBaseId) {
    try {
      const resData = await this.adminService.getAdmin(userId.id);
      return ResponseEntity.OK_WITH(resData);
    } catch (error) {
      this.logger.error(`Admin GET ${JSON.stringify(userId)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH(`관리자 정보조회에 실패하였습니다.`),
      );
    }
  }

  /*
   * @Body userid - 사용자 계정 ID
   * 해당하는 userId를 Admin으로 등록
   */
  @Post()
  async createAdmin(@Body() userId: IBaseId) {
    try {
      const admin = await this.adminService.createAdmin(userId.id);
      return ResponseEntity.OK_WITH(admin);
    } catch (error) {
      this.logger.error(`Admin POST ${JSON.stringify(userId)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH(`관리자 생성에 실패하였습니다.`),
      );
    }
  }

  /*
   * @Body userid - 사용자 계정 ID
   * 해당하는 userId의 관리자 권한을 삭제
   */
  @Delete()
  async deleteAdmin(@Body() userId: IBaseId) {
    try {
      const deleted = await this.adminService.deleteAdmin(userId.id);

      if (deleted !== true) {
        throw new BadRequestException('삭제할 관리자 계정이 존재하지 않습니다.');
      }

      return ResponseEntity.OK_WITH('관리자 게정 삭제가 정상적으로 완료되었습니다.');
    } catch (error) {
      this.logger.error(`Admin DELETE ${JSON.stringify(userId)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('관리자 삭제에 실패하였습니다.'),
      );
    }
  }
}
