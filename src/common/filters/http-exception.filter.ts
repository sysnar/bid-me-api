import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseEntity } from '../libs/res-entity/ResponseEntity';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    console.log(exception);

    console.log(exception.getResponse());
    console.log(host);
    // response.status(status).json({
    //   statusCode: status,
    //   messsage: exception.getResponse(),
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    // });
    response.status(status).json(ResponseEntity.ERROR_WITH('1234'));
  }
}
