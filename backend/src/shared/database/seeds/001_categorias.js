const categorias = [
  { id: 1, nome: 'Bolos e tortas doces' },
  { id: 2, nome: 'Carnes' },
  { id: 3, nome: 'Aves' },
  { id: 4, nome: 'Peixes e frutos do mar' },
  { id: 5, nome: 'Saladas, molhos e acompanhamentos' },
  { id: 6, nome: 'Sopas' },
  { id: 7, nome: 'Massas' },
  { id: 8, nome: 'Bebidas' },
  { id: 9, nome: 'Doces e sobremesas' },
  { id: 10, nome: 'Lanches' },
  { id: 11, nome: 'Prato Único' },
  { id: 12, nome: 'Light' },
  { id: 13, nome: 'Alimentação Saudável' },
];

exports.seed = async function (knex) {
  await knex('categorias').insert(categorias).onConflict('id').merge();

  await knex.raw('ALTER TABLE categorias AUTO_INCREMENT = 14');
};