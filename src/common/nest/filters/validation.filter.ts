import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ValidationException } from '../../exceptions/validation.exception';
import { Response } from 'express';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {

  catch (exception: ValidationException, host: ArgumentsHost): any {

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({
        error: 'Validation Exception',
        fields: exception.fields
      });

  }

}