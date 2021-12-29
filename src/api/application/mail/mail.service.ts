import { Injectable } from '@nestjs/common';
import mustache from 'mustache';
import * as path from 'path';
import * as fs from 'fs/promises';

import { MailSendDTO } from '@app/common/libs/aws-ses/AwsSesParameter';
import { AwsSesMailer } from '@app/common/libs/aws-ses/AwsSesMailer';

@Injectable()
export class MailService {
  async send(filePath: string, data: any, mailSendDTO: MailSendDTO) {
    const plainHtml = await this.templateFromFile(filePath, data);
    mailSendDTO.body = plainHtml;

    AwsSesMailer.SEND_MAIL(mailSendDTO);
  }

  async templateFromFile(filePath: string, data: any): Promise<string> {
    const html = await fs.readFile(
      path.join(__dirname, `./template/${filePath}.hbs`), // 템플릿 중 1개를 설정
    );
    return this.template(html.toString(), data);
  }

  template(html: string, data: any): string {
    return mustache.render(html, data);
  }
}
