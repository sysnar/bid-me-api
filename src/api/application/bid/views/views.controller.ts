import { ViewsCreateDTO } from '@app/api/structure/bid/IViews';
import { ResponseEntity } from '@app/common/libs/res-entity/ResponseEntity';
import { Controller, InternalServerErrorException, Logger, Post } from '@nestjs/common';
import { ViewsService } from './views.service';

@Controller('views')
export class ViewsController {
  constructor(private logger: Logger, private viewsService: ViewsService) {}

  @Post()
  async createViewCount(viewsCreateDTO: ViewsCreateDTO) {
    try {
      await this.viewsService.create(viewsCreateDTO);
      return ResponseEntity.OK('조회수가 증가하였습니다.');
    } catch (error) {
      this.logger.error(`Views - POST ${1234}`, error);
      throw new InternalServerErrorException(
        ResponseEntity.ERROR_WITH('조회수 증가에 실패하였습니다.'),
      );
    }
  }
}
