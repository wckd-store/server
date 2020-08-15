import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from '../../exceptions/validation.exception';

@Injectable ()
export class ValidationPipe implements PipeTransform {
  async transform (value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate (metatype)) {
      return value;
    }

    const object = plainToClass (metatype, value);
    const errors = await validate (object);
    if (errors.length > 0) {
      const missing: {field: string, errors: any}[] = [];
      errors.forEach ((error: ValidationError) => {
        if (!error.value)
          missing.push ({field: error.property, errors: error.constraints});
      });

      if (missing.length > 0) {
          throw new ValidationException(missing);
      }
    }

    return value;
  }

  private toValidate (metadata): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find ((type) => metadata === type);
  }
}