import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AppError } from '../../shared/errors/AppError';
import { UsersRepository } from '../users/users.repository';
import { AuthService } from './auth.service';

jest.mock('bcryptjs', () => ({
  __esModule: true,
  default: {
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  __esModule: true,
  default: {
    sign: jest.fn(),
  },
}));

function createUsersRepositoryMock() {
  return {
    findByLogin: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  } as unknown as jest.Mocked<UsersRepository>;
}

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test_secret';
  });

  it('cadastrar um usuário com senha hasheada', async () => {
    const usersRepository = createUsersRepositoryMock();

    usersRepository.findByLogin.mockResolvedValue(undefined);
    usersRepository.create.mockResolvedValue({
      id: 1,
      nome: 'Anna',
      login: 'anna',
      senha: 'hashed_password',
      criado_em: new Date(),
      alterado_em: new Date(),
    });

    jest.mocked(bcrypt.hash).mockResolvedValue('hashed_password' as never);

    const authService = new AuthService(usersRepository);

    const result = await authService.register({
      name: 'Anna',
      login: 'anna',
      password: '123456',
    });

    expect(usersRepository.findByLogin).toHaveBeenCalledWith('anna');
    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);

    expect(usersRepository.create).toHaveBeenCalledWith({
      nome: 'Anna',
      login: 'anna',
      senha: 'hashed_password',
    });

    expect(result).toEqual({
      id: 1,
      name: 'Anna',
      login: 'anna',
    });
  });

  it('não cadastrar usuário com login duplicado', async () => {
    const usersRepository = createUsersRepositoryMock();

    usersRepository.findByLogin.mockResolvedValue({
      id: 1,
      nome: 'Anna',
      login: 'anna',
      senha: 'hashed_password',
      criado_em: new Date(),
      alterado_em: new Date(),
    });

    const authService = new AuthService(usersRepository);

    await expect(
      authService.register({
        name: 'Anna',
        login: 'anna',
        password: '123456',
      }),
    ).rejects.toMatchObject({
      message: 'Já existe um usuário com este login.',
      statusCode: 409,
    });

    expect(usersRepository.create).not.toHaveBeenCalled();
  });

  it('autenticar usuário existente e retorna token', async () => {
    const usersRepository = createUsersRepositoryMock();

    usersRepository.findByLogin.mockResolvedValue({
      id: 1,
      nome: 'Anna',
      login: 'anna',
      senha: 'hashed_password',
      criado_em: new Date(),
      alterado_em: new Date(),
    });

    jest.mocked(bcrypt.compare).mockResolvedValue(true as never);
    jest.mocked(jwt.sign).mockReturnValue('fake_jwt_token' as never);

    const authService = new AuthService(usersRepository);

    const result = await authService.login({
      login: 'anna',
      password: '123456',
    });

    expect(usersRepository.findByLogin).toHaveBeenCalledWith('anna');
    expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashed_password');

    expect(jwt.sign).toHaveBeenCalledWith({}, 'test_secret', {
      subject: '1',
      expiresIn: '7d',
    });

    expect(result).toEqual({
      user: {
        id: 1,
        name: 'Anna',
        login: 'anna',
      },
      token: 'fake_jwt_token',
    });
  });

  it('não autentica usuário com senha inválida', async () => {
    const usersRepository = createUsersRepositoryMock();

    usersRepository.findByLogin.mockResolvedValue({
      id: 1,
      nome: 'Anna',
      login: 'anna',
      senha: 'hashed_password',
      criado_em: new Date(),
      alterado_em: new Date(),
    });

    jest.mocked(bcrypt.compare).mockResolvedValue(false as never);

    const authService = new AuthService(usersRepository);

    await expect(
      authService.login({
        login: 'anna',
        password: 'senhaerrada',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      authService.login({
        login: 'anna',
        password: 'senhaerrada',
      }),
    ).rejects.toMatchObject({
      message: 'Login ou senha inválidos.',
      statusCode: 401,
    });
  });
});
