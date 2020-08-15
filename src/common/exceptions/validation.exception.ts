import { ForbiddenException } from '@nestjs/common';

export class ValidationException extends Error {

  constructor (
    public readonly fields: {field: string, errors: any}[]
  ) { super (); }

}