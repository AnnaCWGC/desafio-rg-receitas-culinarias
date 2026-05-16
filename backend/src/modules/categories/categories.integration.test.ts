import request from 'supertest';
import { app } from '../../app';

describe('Categories routes', () => {
  it('listar as categorias semeadas', async () => {
    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    expect(response.body.length).toBe(13);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'Bolos e tortas doces',
        }),
        expect.objectContaining({
          id: 13,
          name: 'Alimentação Saudável',
        }),
      ]),
    );
  });
});