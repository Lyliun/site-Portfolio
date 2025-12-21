import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 3001);
  try {
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (err: unknown) {
    // Provide a helpful message for address-in-use errors
    if (
      err &&
      typeof err === 'object' &&
      'code' in err &&
      (err as { code?: string }).code === 'EADDRINUSE'
    ) {
      console.error(`Port ${port} is already in use.`);
      process.exit(1);
    }
    throw err;
  }
}

void bootstrap();
