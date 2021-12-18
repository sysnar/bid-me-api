import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ExceptionTransformFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const responseEntity = instanceToPlain(exception.getResponse());

    response.status(status).json(responseEntity);
  }
}
