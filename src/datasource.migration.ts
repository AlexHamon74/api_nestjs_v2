import { DataSource } from 'typeorm';
import { Client } from './clients/entities/client.entity';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Client],
  migrations: ['src/migrations/*.ts'],
});
