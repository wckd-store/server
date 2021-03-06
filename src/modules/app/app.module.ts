import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from '../user/user.module';
import { SnowflakeService } from '../snowflake/snowflake.service';
import { SnowflakeModule } from '../snowflake/snowflake.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }),

    UserModule,
    AuthModule,
  ],

  providers: [SnowflakeService]
})
export class AppModule {}
