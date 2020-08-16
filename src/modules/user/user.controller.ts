import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserResponseDto, UserUpdateDto } from './user.dto';
import {
  EMAIL_USER_EXISTS_ERROR,
  ID_USER_DOESNT_EXIST_ERROR,
} from './user.exception';
import { Authenticated } from '../../common/nest/decorators/authenticated.decorator';
import { AuthenticatedGuard } from '../../common/nest/guards/authenticated.guard';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get()
  @Authenticated()
  async index(): Promise<UserResponseDto[]> {
    const userArray = await this.userService.findAll();
    return userArray.map(user => UserResponseDto.fromUser(user));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserResponseDto> {
    if (await this.userService.existsByEmail(userCreateDto.email))
      throw EMAIL_USER_EXISTS_ERROR;

    const user = await this.userService.create(userCreateDto);
    return UserResponseDto.fromUser(user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  async retrieve(@Param('id') id): Promise<UserResponseDto> {
    if (!await this.userService.existsById(id))
      throw ID_USER_DOESNT_EXIST_ERROR;

    const user = await this.userService.findById(id);
    return UserResponseDto.fromUser(user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.FOUND)
  async update(@Param('id') id, @Body() userUpdateDto: UserUpdateDto): Promise<UserResponseDto> {
    if (!await this.userService.existsById(id))
      throw ID_USER_DOESNT_EXIST_ERROR;

    const updatedUser = await this.userService.updateById(id, userUpdateDto);
    const user = await this.userService.findById(updatedUser.id);
    return UserResponseDto.fromUser(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.FOUND)
  async destroy(@Param('id') id): Promise<UserResponseDto> {
    if (!await this.userService.existsById(id))
      throw ID_USER_DOESNT_EXIST_ERROR;

    const user = await this.userService.deleteById(id);
    return UserResponseDto.fromUser(user);
  }

}