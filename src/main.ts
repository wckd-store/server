import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from './common/nest/pipes/validation.pipe';
import { ValidationExceptionFilter } from './common/nest/filters/validation.filter';
import { HttpExceptionFilter } from './common/nest/filters/exception.filter';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('apiv1');

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new ValidationExceptionFilter())

  await app.listen(8080);
}

bootstrap();
