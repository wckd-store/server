import { IsEmail, IsEmpty, IsString, Length } from 'class-validator';
import { Match } from '../../common/nest/decorators/match.decorator';

export class UserRegisterDto {

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

  @IsString()
  @Length(8, 30)
  @Match('password')
  passwordConfirmation: string;

}