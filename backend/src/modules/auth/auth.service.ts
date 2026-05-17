import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../../shared/errors/AppError';
import { UsersRepository } from '../users/users.repository';
import { LoginBody, RegisterBody } from './auth.schemas';

type AuthenticatedUserResponse = {
  id: number;
  name: string | null;
  login: string;
};

type LoginResponse = {
  user: AuthenticatedUserResponse;
  token: string;
};

export class AuthService {
  constructor(private usersRepository = new UsersRepository()) {}

  // Registra um novo usuário
  async register(data: RegisterBody): Promise<AuthenticatedUserResponse> {
    const userAlreadyExists = await this.usersRepository.findByLogin(data.login);

    if (userAlreadyExists) {
      throw new AppError('Já existe um usuário com este login.', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.usersRepository.create({
      nome: data.name,
      login: data.login,
      senha: hashedPassword,
    });

    return {
      id: user.id,
      name: user.nome,
      login: user.login,
    };
  }

  // Autentica um usuário e retorna um token JWT
  async login(data: LoginBody): Promise<LoginResponse> {
    const user = await this.usersRepository.findByLogin(data.login);

    if (!user) {
      throw new AppError('Login ou senha inválidos.', 401);
    }

    const passwordMatches = await bcrypt.compare(data.password, user.senha);

    if (!passwordMatches) {
      throw new AppError('Login ou senha inválidos.', 401);
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new AppError('JWT_SECRET não configurado.', 500);
    }

    const token = jwt.sign({}, jwtSecret, {
      subject: String(user.id),
      expiresIn: '7d',
    });

    return {
      user: {
        id: user.id,
        name: user.nome,
        login: user.login,
      },
      token,
    };
  }
}
