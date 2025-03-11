import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
const envFile = path.resolve(process.cwd(), '.env');
config({ path: envFile });

const configService = new ConfigService();

// Validate required environment variables
if (!process.env.DB_HOST) {
  throw new Error('DB_HOST environment variable is not defined');
}

if (!process.env.DB_PORT) {
  throw new Error('DB_PORT environment variable is not defined');
}

if (!process.env.DB_USERNAME) {
  throw new Error('DB_USERNAME environment variable is not defined');
}

if (!process.env.DB_PASSWORD) {
  throw new Error('DB_PASSWORD environment variable is not defined');
}

if (!process.env.DB_NAME) {
  throw new Error('DB_NAME environment variable is not defined');
}

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_history',
});
