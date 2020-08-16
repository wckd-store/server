import { Global, Module } from '@nestjs/common';
import { SnowflakeService } from './snowflake.service';

@Module({
  providers: [SnowflakeService],
  exports: [SnowflakeService]
})
@Global()
export class SnowflakeModule { }