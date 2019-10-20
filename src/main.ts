import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap(): Promise<INestApplication> {
  return await NestFactory.create(AppModule, {
    logger: ['log'],
  });
}

bootstrap().then(app => {
  app.listen(3000);
}).catch(error => {
  throw error;
});
