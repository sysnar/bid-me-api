import { RecomandKeyword } from '@app/models/user/RecomandKeyword.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RecomandKeyword)
export class KeywordRepository extends Repository<RecomandKeyword> {}
