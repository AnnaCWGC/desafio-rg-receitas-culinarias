import { api } from './api';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '../types/api';

export const authService = {
  async register(data: RegisterRequest): Promise<User> {
    const response = await api.post<User>('/auth/register', data);

    return response.data;
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);

    return response.data;
  },
};