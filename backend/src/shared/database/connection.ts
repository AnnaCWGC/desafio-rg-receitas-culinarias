import knex, { Knex } from 'knex';
import 'dotenv/config';

const databaseName =
  process.env.NODE_ENV === 'test'
    ? process.env.DB_NAME_TEST || 'teste_receitas_rg_sistemas_test'
    : process.env.DB_NAME || 'teste_receitas_rg_sistemas';

const databaseConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3307),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: databaseName,
  },
  migrations: {
    directory: './src/shared/database/migrations',
    extension: 'js',
  },
  seeds: {
    directory: './src/shared/database/seeds',
    extension: 'js',
  },
};

export const database = knex(databaseConfig);