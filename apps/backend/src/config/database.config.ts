import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Api } from '../api/api-repository/entities/api.entity';
import { ApiParameter } from '../api/api-repository/entities/api-parameter.entity';
import { Book } from '../api/books/entities/book.entity';
import { Movie } from '../api/movies/entities/movie.entity';
import { Query } from '../api/queries/entities/query.entity';
import { QueryParameter } from '../api/queries/entities/query-parameter.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Api, ApiParameter, Book, Movie, Query, QueryParameter],
  synchronize: false, // Disable auto-synchronization
  logging: process.env.NODE_ENV !== 'production',
};

// Validate required database environment variables
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
