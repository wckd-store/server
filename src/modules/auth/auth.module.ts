import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PasswordModule } from '../password/password.module';

@Module({
  imports: [
    JwtModule.register({secret: 'secretodemais', signOptions: {expiresIn: '5h'}}),
    UserModule,
    PasswordModule
  ],
  controllers: [AuthController]
})
export class AuthModule { }