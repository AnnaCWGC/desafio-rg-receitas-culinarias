import mysql from 'mysql2/promise';
import type { Knex } from 'knex';

process.env.NODE_ENV = 'test';
process.env.PORT = process.env.PORT || '3334';
process.env.DB_HOST = process.env.DB_HOST || '127.0.0.1';
process.env.DB_PORT = process.env.DB_PORT || '3307';
process.env.DB_USER = process.env.DB_USER || 'root';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'root';
process.env.DB_NAME_TEST =
  process.env.DB_NAME_TEST || 'teste_receitas_rg_sistemas_test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

const { database } = require('../shared/database/connection') as {
  database: Knex;
};

beforeAll(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME_TEST}\`;`,
  );

  await connection.end();

  await database.migrate.latest();
  await database.seed.run();
});

beforeEach(async () => {
  await database('receitas').delete();
  await database('usuarios').delete();
});

afterAll(async () => {
  await database.destroy();
});