import { database } from '../../shared/database/connection';

export type Category = {
  id: number;
  nome: string | null;
};

export class CategoriesRepository {
  async findAll(): Promise<Category[]> {
    return database<Category>('categorias').select('*').orderBy('nome', 'asc');
  }
}