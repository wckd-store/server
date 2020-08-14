import { Global, Injectable, Module } from '@nestjs/common';
import SnowflakeId from 'snowflake-id';
import { SnowflakeService } from './snowflake.service';

@Module({
  providers: [SnowflakeService],
  exports: [SnowflakeService]
})
export class SnowflakeModule {

}