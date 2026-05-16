import { database } from '../../shared/database/connection';

export type User = {
  id: number;
  nome: string | null;
  login: string;
  senha: string;
  criado_em: Date;
  alterado_em: Date;
};

type CreateUserInput = {
  nome: string;
  login: string;
  senha: string;
};

export class UsersRepository {
  async findByLogin(login: string): Promise<User | undefined> {
    return database<User>('usuarios').where({ login }).first();
  }

  async findById(id: number): Promise<User | undefined> {
    return database<User>('usuarios').where({ id }).first();
  }

  async create(data: CreateUserInput): Promise<User> {
    const now = new Date();

    const [id] = await database('usuarios').insert({
      nome: data.nome,
      login: data.login,
      senha: data.senha,
      criado_em: now,
      alterado_em: now,
    });

    const user = await this.findById(id);

    if (!user) {
      throw new Error('Usuário não encontrado após criação.');
    }

    return user;
  }
}