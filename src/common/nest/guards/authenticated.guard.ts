import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { INVALID_AUTHENTICATION_ERROR, UNAUTHENTICATED_ERROR } from '../../exceptions/authentication.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(
    @Inject('JwtService') private readonly jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const header = req.header('Authorization');
    if(!header)
      throw UNAUTHENTICATED_ERROR;

    const [tokenType, tokenValue] = header;
    if(tokenType !== 'Bearer')
      throw INVALID_AUTHENTICATION_ERROR;

    if(!this.jwtService.verify(tokenValue))
      throw INVALID_AUTHENTICATION_ERROR;

    return true;
  }
}