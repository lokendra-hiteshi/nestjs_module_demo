import { Dialect } from 'sequelize/types';
import 'dotenv/config';

export const databaseConfig = {
  dialect: 'postgres' as Dialect,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadModels: true,
  synchronize: true,
};
