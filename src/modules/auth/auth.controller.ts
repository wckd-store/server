import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto, LoginDto, RegisterDto } from './auth.dto';
import { PasswordService } from '../password/password.service';
import { INCORRECT_PASSWORD_ERROR } from './auth.exception';
import { EMAIL_USER_DOESNT_EXIST_ERROR, EMAIL_USER_EXISTS_ERROR } from '../user/user.exception';

@Controller('auth')
export class AuthController {

  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService
  ) { }

  @Post('register')
  async register(@Body() userRegisterDto: RegisterDto): Promise<JwtPayloadDto> {
    if(await this.userService.existsByEmail(userRegisterDto.email))
      throw EMAIL_USER_EXISTS_ERROR;

    const user =  await this.userService.create(userRegisterDto);

    const jwtPayloadDto = new JwtPayloadDto();
    jwtPayloadDto.token = await this.jwtService.signAsync({id: user.id})
    jwtPayloadDto.expires_in = '5h'
    return jwtPayloadDto;
  }

  @Post('login')
  async login(@Body() userLoginDto: LoginDto): Promise<JwtPayloadDto> {
    if(!await this.userService.existsByEmail(userLoginDto.email))
      throw EMAIL_USER_DOESNT_EXIST_ERROR;

    const user = await this.userService.findByEmail(userLoginDto.email);
    if(!await this.passwordService.checkHash(user.password, userLoginDto.password))
      throw INCORRECT_PASSWORD_ERROR;

    const jwtPayloadDto = new JwtPayloadDto();
    jwtPayloadDto.token = await this.jwtService.signAsync({id: user.id})
    jwtPayloadDto.expires_in = '5h'
    return jwtPayloadDto;
  }

}