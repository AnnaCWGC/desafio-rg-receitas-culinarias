import { CategoriesRepository } from './categories.repository';

type CategoryResponse = {
  id: number;
  name: string | null;
};

export class CategoriesService {
  private categoriesRepository: CategoriesRepository;

  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

// Retorna todas as categorias ordenadas por nome
  async findAll(): Promise<CategoryResponse[]> {
    const categories = await this.categoriesRepository.findAll();

    return categories.map((category) => ({
      id: category.id,
      name: category.nome,
    }));
  }
}