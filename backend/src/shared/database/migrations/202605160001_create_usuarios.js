exports.up = async function (knex) {
  await knex.schema.createTable('usuarios', function (table) {
    table.increments('id').primary();
    table.string('nome', 100).nullable();
    table.string('login', 100).notNullable();
    table.string('senha', 100).notNullable();
    table.dateTime('criado_em').notNullable();
    table.dateTime('alterado_em').notNullable();

    table.unique(['login'], 'login_UNIQUE');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('usuarios');
};