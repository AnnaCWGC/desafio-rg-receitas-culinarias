import { api } from './api';
import { Category } from '../types/api';

export const categoriesService = {
  async list(): Promise<Category[]> {
    const response = await api.get<Category[]>('/categories');

    return response.data;
  },
};