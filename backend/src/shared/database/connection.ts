import knex, { Knex } from 'knex';
import 'dotenv/config';

const databaseConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3307),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'teste_receitas_rg_sistemas',
  },
};

export const database = knex(databaseConfig);