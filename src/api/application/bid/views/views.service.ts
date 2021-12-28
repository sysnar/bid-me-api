import { ViewsCreateDTO } from '@app/api/structure/bid/IViews';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../../user/user/user.service';
import { BidDataService } from '../data/bid.data.service';
import { ViewsRespository } from './views.repository';

@Injectable()
export class ViewsService {
  constructor(
    @InjectRepository(ViewsRespository)
    private viewsRepository: ViewsRespository,

    private userService: UserService,
    private bidDataService: BidDataService,
  ) {}

  async create(viewsCreateDTO: ViewsCreateDTO) {
    const { bidId, userId } = viewsCreateDTO;

    const bid = await this.bidDataService.findById(bidId);
    const user = await this.userService.findById(userId);

    const views = this.viewsRepository.create({ bid, user });
    await this.viewsRepository.save(views);
  }
}
