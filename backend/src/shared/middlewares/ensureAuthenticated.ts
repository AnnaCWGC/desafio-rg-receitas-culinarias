import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../../modules/users/users.repository';

export const ensureAuthenticated = async (
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não informado.', 401);
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError('Token inválido.', 401);
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new AppError('JWT_SECRET não configurado.', 500);
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (typeof decoded !== 'object' || !decoded.sub) {
      throw new AppError('Token inválido.', 401);
    }

    const userId = Number(decoded.sub);

    if (Number.isNaN(userId)) {
      throw new AppError('Token inválido.', 401);
    }

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 401);
    }

    request.user = {
      id: user.id,
      login: user.login,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Token inválido.', 401);
  }
};