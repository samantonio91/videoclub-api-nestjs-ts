import { ValidationPipe, type INestApplication } from '@nestjs/common';

/** Shared configuration for real HTTP startup and tests. */
export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
}
