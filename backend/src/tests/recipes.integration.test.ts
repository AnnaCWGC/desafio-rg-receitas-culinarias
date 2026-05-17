import request from 'supertest';
import { app } from '../app';

async function createAuthenticatedUser(login = 'anna') {
  await request(app).post('/auth/register').send({
    name: 'Anna',
    login,
    password: '123456',
  });

  const loginResponse = await request(app).post('/auth/login').send({
    login,
    password: '123456',
  });

  return {
    token: loginResponse.body.token as string,
    user: loginResponse.body.user as {
      id: number;
      name: string;
      login: string;
    },
  };
}

describe('Recipes routes', () => {
  it('não listar receitas sem autenticação', async () => {
    const response = await request(app).get('/recipes');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Token não informado.');
  });

  it('criar uma receita para o usuário autenticado', async () => {
    const { token, user } = await createAuthenticatedUser();

    const response = await request(app)
      .post('/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        categoryId: 1,
        name: 'Bolo de cenoura',
        preparationTimeMinutes: 45,
        servings: 8,
        preparationMode:
          'Bata os ingredientes no liquidificador, misture com a farinha e leve ao forno.',
        ingredients:
          '3 cenouras; 2 ovos; 2 xícaras de farinha; 1 xícara de açúcar',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: user.id,
        categoryId: 1,
        name: 'Bolo de cenoura',
        preparationTimeMinutes: 45,
        servings: 8,
        preparationMode:
          'Bata os ingredientes no liquidificador, misture com a farinha e leve ao forno.',
        ingredients:
          '3 cenouras; 2 ovos; 2 xícaras de farinha; 1 xícara de açúcar',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('listar apenas receitas do usuário autenticado', async () => {
    const firstUser = await createAuthenticatedUser('anna');
    const secondUser = await createAuthenticatedUser('maria');

    await request(app)
      .post('/recipes')
      .set('Authorization', `Bearer ${firstUser.token}`)
      .send({
        categoryId: 1,
        name: 'Bolo de cenoura',
        preparationTimeMinutes: 45,
        servings: 8,
        preparationMode: 'Modo de preparo do bolo de cenoura.',
        ingredients: 'Cenoura; ovos; farinha',
      });

    await request(app)
      .post('/recipes')
      .set('Authorization', `Bearer ${secondUser.token}`)
      .send({
        categoryId: 2,
        name: 'Carne assada',
        preparationTimeMinutes: 90,
        servings: 4,
        preparationMode: 'Modo de preparo da carne assada.',
        ingredients: 'Carne; sal; alho',
      });

    const response = await request(app)
      .get('/recipes')
      .set('Authorization', `Bearer ${firstUser.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe('Bolo de cenoura');
    expect(response.body[0].userId).toBe(firstUser.user.id);
  });

  it('atualizar uma receita do usuário autenticado', async () => {
    const { token } = await createAuthenticatedUser();

    const createResponse = await request(app)
      .post('/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        categoryId: 1,
        name: 'Bolo de cenoura',
        preparationTimeMinutes: 45,
        servings: 8,
        preparationMode: 'Modo de preparo inicial.',
        ingredients: 'Cenoura; ovos; farinha',
      });

    const recipeId = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/recipes/${recipeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        servings: 10,
        preparationTimeMinutes: 50,
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.servings).toBe(10);
    expect(updateResponse.body.preparationTimeMinutes).toBe(50);
    expect(updateResponse.body.name).toBe('Bolo de cenoura');
  });

  it('deletar uma receita do usuário autenticado', async () => {
    const { token } = await createAuthenticatedUser();

    const createResponse = await request(app)
      .post('/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        categoryId: 1,
        name: 'Bolo de cenoura',
        preparationTimeMinutes: 45,
        servings: 8,
        preparationMode: 'Modo de preparo inicial.',
        ingredients: 'Cenoura; ovos; farinha',
      });

    const recipeId = createResponse.body.id;

    const deleteResponse = await request(app)
      .delete(`/recipes/${recipeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteResponse.status).toBe(204);

    const findResponse = await request(app)
      .get(`/recipes/${recipeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(findResponse.status).toBe(404);
  });

  it('não criar uma receita com uma categoria inválida', async () => {
    const { token } = await createAuthenticatedUser();

    const response = await request(app)
      .post('/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        categoryId: 9999,
        name: 'Receita inválida',
        preparationTimeMinutes: 30,
        servings: 2,
        preparationMode: 'Modo de preparo qualquer.',
        ingredients: 'Ingrediente qualquer',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Categoria não encontrada.');
  });
});