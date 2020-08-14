import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from '../user/user.module';
import { SnowflakeService } from '../snowflake/snowflake.service';
import { SnowflakeModule } from '../snowflake/snowflake.module';

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost:27017/", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),

    SnowflakeModule,
    UserModule
  ],

  providers: [SnowflakeService]
})
export class AppModule {}
