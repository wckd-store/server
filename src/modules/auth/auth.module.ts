import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PasswordModule } from '../password/password.module';
import { JwtModule } from '../jwt/jwt.module';



@Module({
  imports: [
    JwtModule,
    UserModule,
    PasswordModule
  ],
  controllers: [AuthController]
})
@Global()
export class AuthModule { }