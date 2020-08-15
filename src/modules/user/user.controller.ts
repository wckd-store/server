import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserCreateDto, UserUpdateDto } from './user.dto';
import {
  EMAIL_USER_EXISTS_ERROR,
  ID_USER_DOESNT_EXIST_ERROR,
} from './user.exception';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get()
  async index(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() userCreateDto: UserCreateDto): Promise<User> {
    if (await this.userService.existsByEmail(userCreateDto.email))
      throw EMAIL_USER_EXISTS_ERROR;

    return await this.userService.create(userCreateDto);
  }

  @Get(':id')
  async retrieve(@Param('id') id): Promise<User> {
    if (!await this.userService.existsById(id))
      throw ID_USER_DOESNT_EXIST_ERROR;

    return await this.userService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() userUpdateDto: UserUpdateDto): Promise<User> {
    if (!await this.userService.existsById(id))
      throw ID_USER_DOESNT_EXIST_ERROR;

    return await this.userService.updateById(id, userUpdateDto);
  }

  @Delete(':id')
  async destroy(@Param('id') id): Promise<User> {
    if (!await this.userService.existsById(id))
      throw ID_USER_DOESNT_EXIST_ERROR;

    return await this.userService.deleteById(id);
  }

}