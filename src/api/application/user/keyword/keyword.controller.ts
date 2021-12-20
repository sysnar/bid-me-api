import { Controller, Get } from '@nestjs/common';

@Controller('keyword')
export class KeywordController {
  @Get()
  async getKeyword() {}
}
