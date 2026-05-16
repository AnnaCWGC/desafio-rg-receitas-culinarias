import request from 'supertest';
import { app } from '../../app';

describe('Auth routes', () => {
  it('cadstra um novo usuário', async () => {
    const response = await request(app).post('/auth/register').send({
      name: 'Anna',
      login: 'anna',
      password: '123456',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      name: 'Anna',
      login: 'anna',
    });

    expect(response.body).not.toHaveProperty('password');
    expect(response.body).not.toHaveProperty('senha');
  });

  it('não cadastra dois usuarios com o mesmo login', async () => {
    await request(app).post('/auth/register').send({
      name: 'Anna',
      login: 'anna',
      password: '123456',
    });

    const response = await request(app).post('/auth/register').send({
      name: 'Anna 2',
      login: 'anna',
      password: '123456',
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Já existe um usuário com este login.');
  });

  it('autentica um usuário existente', async () => {
    await request(app).post('/auth/register').send({
      name: 'Anna',
      login: 'anna',
      password: '123456',
    });

    const response = await request(app).post('/auth/login').send({
      login: 'anna',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: expect.any(Number),
      name: 'Anna',
      login: 'anna',
    });
    expect(response.body.token).toEqual(expect.any(String));
  });

  it('não autentica com senha inválida', async () => {
    await request(app).post('/auth/register').send({
      name: 'Anna',
      login: 'anna',
      password: '123456',
    });

    const response = await request(app).post('/auth/login').send({
      login: 'anna',
      password: 'senhaerrada',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Login ou senha inválidos.');
  });
});