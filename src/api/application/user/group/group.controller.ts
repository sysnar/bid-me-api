import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { GroupCreateDTO, GroupUpdateDTO } from '@app/api/structure/user/IGroup';
import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService, private logger: Logger) {}

  @Get(':id')
  async getGroup(@Param('id') id: string) {
    try {
      const resData = await this.groupService.findOneById(id);
      return ResponseEntity.OK_WITH(resData);
    } catch (error) {
      this.logger.error(`Group GET - ${JSON.stringify(id)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('그룹 조회에 실패하였습니다.'),
      );
    }
  }

  @Post()
  async createGroup(@Body() group: GroupCreateDTO) {
    try {
      const resData = await this.groupService.create(group);
      return ResponseEntity.OK_WITH(resData);
    } catch (error) {
      this.logger.error(`Group Post - ${JSON.stringify(group)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('그룹생성에 실패하였습니다.'),
      );
    }
  }

  @Put()
  async updateGroup(@Body() group: GroupUpdateDTO) {
    try {
      const resData = await this.groupService.update(group);
      return ResponseEntity.OK_WITH(resData);
    } catch (error) {
      this.logger.error(`Group PUT - ${JSON.stringify(group)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('그룹 업데이트에 실패하였습니다.'),
      );
    }
  }

  @Delete()
  async deleteGroup(@Body('id') id: string) {
    try {
      const deleted = await this.groupService.delete(id);

      if (deleted === false) {
        throw new BadRequestException('삭제할 관리자 계정이 존재하지 않습니다.');
      }

      return ResponseEntity.OK('그룹 삭제 완료');
    } catch (error) {
      this.logger.error(`Group DELETE - ${JSON.stringify(id)}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('그룹 삭제에 실패하였습니다.'),
      );
    }
  }
}
