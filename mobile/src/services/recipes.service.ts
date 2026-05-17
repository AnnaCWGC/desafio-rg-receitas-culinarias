import { api } from './api';
import {
  CreateRecipeRequest,
  ListRecipesParams,
  Recipe,
  UpdateRecipeRequest,
} from '../types/api';

export const recipesService = {
  async list(params?: ListRecipesParams): Promise<Recipe[]> {
    const response = await api.get<Recipe[]>('/recipes', {
      params,
    });

    return response.data;
  },

  async findById(id: number): Promise<Recipe> {
    const response = await api.get<Recipe>(`/recipes/${id}`);

    return response.data;
  },

  async create(data: CreateRecipeRequest): Promise<Recipe> {
    const response = await api.post<Recipe>('/recipes', data);

    return response.data;
  },

  async update(id: number, data: UpdateRecipeRequest): Promise<Recipe> {
    const response = await api.put<Recipe>(`/recipes/${id}`, data);

    return response.data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/recipes/${id}`);
  },
};