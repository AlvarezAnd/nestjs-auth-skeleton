import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: [__dirname + '/../**/entities/*.entity.{ts,js}'],
  migrations: [__dirname + '/../database/migrations/*.{ts,js}'],
};

export default new DataSource(dataSourceOptions);
