import AWS from 'aws-sdk';
import { AwsSesParameter, MailSendDTO } from './AwsSesParameter';

AWS.config.update({ region: 'ap-northeast-2' });

export class AwsSesMailer {
  static SEND_MAIL(mailSendDTO: MailSendDTO) {
    // 메일을 발송할 주소, 바디(내용)을 설정
    const params = AwsSesParameter.create(mailSendDTO);

    // AWS SES 메일 발송
    const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }) //
      .sendEmail(params)
      .promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
      .then(function (data) {
        console.log(data.MessageId);
      })
      .catch(function (err) {
        console.error(err, err.stack);
      });
  }
}
