exports.up = async function (knex) {
  await knex.schema.createTable('categorias', function (table) {
    table.increments('id').primary();
    table.string('nome', 100).nullable();

    table.unique(['nome'], 'nome_UNIQUE');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('categorias');
};