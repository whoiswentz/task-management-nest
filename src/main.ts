import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  try {
    const app: INestApplication = await NestFactory.create(AppModule);
    await app.listen(3000);
  } catch (error) {
    throw new Error(error);
  }
}

bootstrap();
