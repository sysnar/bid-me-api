import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IBaseId } from '@app/api/structure/IBase';
import { IKeyword, KeywordCreateDTO } from '@app/api/structure/user/IKeyword';
import { KeywordRepository } from './keyword.repository';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(KeywordRepository)
    private keywordRepository: KeywordRepository,
  ) {}

  async findOneById(keywordId: IBaseId) {
    return await this.keywordRepository.findOne(keywordId);
  }

  async create(keyword: KeywordCreateDTO) {
    const foundKeyword = await this.keywordRepository.findOne(); // Find keyword which one have it

    if (Object.keys(foundKeyword).length > 0) {
      throw new BadRequestException('삭제할 키워드가 존재하지 않습니다.');
    }

    const keywordInstance = this.keywordRepository.create(keyword);
    return await this.keywordRepository.save(keywordInstance);
  }

  async update(keyword: IKeyword) {
    const { id, ...updateKeyword } = keyword;
    await this.keywordRepository.update(id, updateKeyword);
    return await this.keywordRepository.findOne(id);
  }

  async delete(keywordId: IBaseId) {
    const foundKeyword = await this.keywordRepository.findOne(keywordId);

    if (Object.keys(foundKeyword).length > 0) return false;

    await this.keywordRepository.delete(keywordId);
    return true;
  }
}
