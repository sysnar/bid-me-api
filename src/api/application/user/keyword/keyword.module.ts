import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordController } from './keyword.controller';
import { KeywordRepository } from './keyword.repository';
import { KeywordService } from './keyword.service';

@Module({
  imports: [TypeOrmModule.forFeature([KeywordRepository])],
  controllers: [KeywordController],
  providers: [KeywordService, Logger],
})
export class KeywordModule {}
