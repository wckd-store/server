import { Module } from "@nestjs/common";
import { TypegooseModule } from 'nestjs-typegoose';

import { User } from './user.entity';
import { UserService } from './user.service';
import { SnowflakeModule } from '../snowflake/snowflake.module';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    SnowflakeModule
  ],
  providers: [UserService]
})
export class UserModule { }