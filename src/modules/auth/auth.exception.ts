import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectPasswordException extends HttpException {
  constructor () {
    super ("Incorrect password", HttpStatus.UNAUTHORIZED);
  }
}
export const INCORRECT_PASSWORD_ERROR = new IncorrectPasswordException();