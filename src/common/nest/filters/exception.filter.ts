import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationException } from '../../exceptions/validation.exception';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch (exception: HttpException, host: ArgumentsHost): any {

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res
      .status(exception.getStatus())
      .json({
        message: exception.getResponse(),
      });

  }

}