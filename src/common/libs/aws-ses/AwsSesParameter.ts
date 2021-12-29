import { SendEmailRequest } from 'aws-sdk/clients/ses';

export class AwsSesParameter implements SendEmailRequest {
  Destination: {
    ToAddresses: string[];
    CcAddresses?: string[];
  };

  Message: {
    Body: {
      Html: {
        Charset: string | 'UTF-8';
        Data: string;
      };
    };
    Subject: {
      Charset: string | 'UTF-8';
      Data: string;
    };
  };
  Source: string;
  ReplyToAddresses: string[];

  constructor(mailSendDTO: MailSendDTO) {
    this.Destination.ToAddresses = mailSendDTO.toAddress;
    this.Destination.CcAddresses = mailSendDTO.ccAddress;
    this.Message.Subject.Data = mailSendDTO.subject;
    this.Message.Body.Html.Data = mailSendDTO.body;
  }

  static create(mailSendDTO: MailSendDTO): SendEmailRequest {
    return new AwsSesParameter(mailSendDTO);
  }
}

export class MailSendDTO {
  toAddress: string[];
  ccAddress?: string[];
  subject: string;
  body?: string;
}
