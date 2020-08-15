import { IsEmail, IsEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Match } from '../../common/nest/decorators/match.decorator';

export class UserCreateDto {

  @IsEmpty()
  readonly id: string;

  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  @Length(3, 20)
  surname: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 30)
  password: string;

}

export class UserUpdateDto {

  @IsEmpty()
  readonly id: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  name: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  surname: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(8, 30)
  password: string;

}