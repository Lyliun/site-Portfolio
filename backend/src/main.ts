import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import type { Application, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 3001;

  // suppress favicon 404 noise
  const server = app.getHttpAdapter().getInstance() as Application;
  server.get('/favicon.ico', (_req: Request, res: Response) =>
    res.status(204).end(),
  );

  await app.listen(port);
  console.log(`🚀 Backend rodando em http://localhost:${port}`);
  console.log(`📧 Contact API: http://localhost:${port}/api/contact`);
  console.log(`📊 Analytics API: http://localhost:${port}/api/analytics`);
  console.log(`💼 Projects API: http://localhost:${port}/api/projects`);
}

// handle bootstrap promise explicitly to satisfy no-floating-promises
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
