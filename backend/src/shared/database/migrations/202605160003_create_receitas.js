exports.up = async function (knex) {
  await knex.schema.createTable('receitas', function (table) {
    table.increments('id').primary();

    table.integer('id_usuarios').unsigned().notNullable();
    table.integer('id_categorias').unsigned().nullable();

    table.string('nome', 45).nullable();
    table.integer('tempo_preparo_minutos').unsigned().nullable();
    table.integer('porcoes').unsigned().nullable();
    table.text('modo_preparo').notNullable();
    table.text('ingredientes').nullable();

    table.dateTime('criado_em').notNullable();
    table.dateTime('alterado_em').notNullable();

    table.index(['id_usuarios'], 'fk_receitas_1_idx');
    table.index(['id_categorias'], 'fk_receitas_2_idx');

    table
      .foreign('id_usuarios', 'fk_receitas_1')
      .references('id')
      .inTable('usuarios')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');

    table
      .foreign('id_categorias', 'fk_receitas_2')
      .references('id')
      .inTable('categorias')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('receitas');
};