import { HttpException, HttpStatus } from '@nestjs/common';

export class ExistingDocumentException extends HttpException {
  constructor (model: string, field: string) {
    super (`a ${model} with this ${field} already exists.`, HttpStatus.CONFLICT);
  }
}

export class NonExistingDocumentException extends HttpException {
  constructor (model: string, field: string) {
    super (`a ${model} with this ${field} don't exists.`, HttpStatus.NOT_FOUND);
  }
}