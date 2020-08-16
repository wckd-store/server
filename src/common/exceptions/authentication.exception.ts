import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthenticatedException extends HttpException {
  constructor () {
    super (`User is unauthenticated.`, HttpStatus.UNAUTHORIZED);
  }
}
export const UNAUTHENTICATED_ERROR = new UnauthenticatedException();

export class InvalidAuthenticationException extends HttpException {
  constructor () {
    super (`User's authentication is invalid.`, HttpStatus.UNAUTHORIZED);
  }
}
export const INVALID_AUTHENTICATION_ERROR = new InvalidAuthenticationException();
