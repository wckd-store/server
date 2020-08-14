import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from '../user/user.dto';

@Controller('auth')
export class AuthController {

  constructor (
    private readonly userService: UserService
  ) {
  }

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto): Promise<User> {
    return await this.userService.create(userRegisterDto);
  }

}