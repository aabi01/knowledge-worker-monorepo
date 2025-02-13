import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeders/seeder.module';
import { SeederService } from './seeders/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(SeederModule);
  const seeder = app.get(SeederService);
  
  try {
    await seeder.seed();
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
