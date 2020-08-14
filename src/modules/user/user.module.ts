import { Module } from "@nestjs/common";
import { TypegooseModule } from 'nestjs-typegoose';

import { User } from './user.entity';
import { UserService } from './user.service';
import { SnowflakeModule } from '../snowflake/snowflake.module';
import { PasswordModule } from '../password/password.module';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    SnowflakeModule,
    PasswordModule
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }