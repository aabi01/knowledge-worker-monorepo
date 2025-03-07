import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ensure required environment variables are present
  if (!process.env.CORS_ORIGIN) {
    throw new Error('CORS_ORIGIN environment variable is not defined');
  }

  // Enable CORS for the frontend
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Ensure PORT environment variable is present
  if (!process.env.PORT) {
    throw new Error('PORT environment variable is not defined');
  }

  await app.listen(parseInt(process.env.PORT, 10));
}
bootstrap();
