import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('apiv1');
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }))

  await app.listen(8080);
}

bootstrap();
