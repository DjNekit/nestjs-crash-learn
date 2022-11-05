import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning();
  app.use(logger);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    disableErrorMessages: process.env.NODE_ENV === 'production'
  }));
  
  await app.listen(process.env.PORT);
}
bootstrap();
