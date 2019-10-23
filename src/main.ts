import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService, Environments } from './config/config.service';

async function bootstrap(): Promise<void> {
  const logger: Logger = new Logger('Application Bootstrap');
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port: string = configService.env.PORT;
  try {
    app.enableShutdownHooks(); // Starts listening to shutdown hooks
    if (configService.env.NODE_ENV === Environments.DEVELOPMENT) {
      app.enableCors();
    }
    await app.listen(port, () => {
      logger.log(`Application starts on port ${port}`);
    });
  } catch (error) {
    throw error;
  }
}

bootstrap();
