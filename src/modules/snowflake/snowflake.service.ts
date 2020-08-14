import { Global, Injectable } from '@nestjs/common';
import SnowflakeId from 'snowflake-id';

@Global()
@Injectable()
export class SnowflakeService {

  private readonly snowflake = new SnowflakeId();

  create(): string {
    return this.snowflake.generate();
  }
}