import { AppError } from '../../shared/errors/AppError';
import { CategoriesRepository } from '../categories/categories.repository';
import {
  CreateRecipeBody,
  ListRecipesQuery,
  UpdateRecipeBody,
} from './recipes.schemas';
import { Recipe, RecipesRepository } from './recipes.repository';

type RecipeResponse = {
  id: number;
  userId: number;
  categoryId: number | null;
  name: string | null;
  preparationTimeMinutes: number | null;
  servings: number | null;
  preparationMode: string;
  ingredients: string | null;
  createdAt: string;
  updatedAt: string;
};

export class RecipesService {
  constructor(
    private recipesRepository = new RecipesRepository(),
    private categoriesRepository = new CategoriesRepository(),
  ) {}
    
  // Retorna todas as receitas ordenadas por nome
  async findAll(
    userId: number,
    query: ListRecipesQuery,
  ): Promise<RecipeResponse[]> {
    const recipes = await this.recipesRepository.findAll({
      userId,
      search: query.search,
      categoryId: query.categoryId,
      page: query.page,
      limit: query.limit,
    });

    return recipes.map(this.mapRecipeToResponse);
  }
  
  // Retorna uma receita especifica por id
  async findById(id: number, userId: number): Promise<RecipeResponse> {
    const recipe = await this.recipesRepository.findById(id, userId);

    if (!recipe) {
      throw new AppError('Receita não encontrada.', 404);
    }

    return this.mapRecipeToResponse(recipe);
  }

  // Cria uma nova receita
  async create(
    userId: number,
    data: CreateRecipeBody,
  ): Promise<RecipeResponse> {
    await this.ensureCategoryExists(data.categoryId);

    const recipe = await this.recipesRepository.create({
      id_usuarios: userId,
      id_categorias: data.categoryId ?? null,
      nome: data.name,
      tempo_preparo_minutos: data.preparationTimeMinutes ?? null,
      porcoes: data.servings ?? null,
      modo_preparo: data.preparationMode,
      ingredientes: data.ingredients ?? null,
    });

    return this.mapRecipeToResponse(recipe);
  }

    
  // Atualiza uma receita existente
  async update(
    id: number,
    userId: number,
    data: UpdateRecipeBody,
  ): Promise<RecipeResponse> {
    const currentRecipe = await this.recipesRepository.findById(id, userId);

    if (!currentRecipe) {
      throw new AppError('Receita não encontrada.', 404);
    }

    if ('categoryId' in data) {
      await this.ensureCategoryExists(data.categoryId);
    }

    const updateData: Parameters<RecipesRepository['update']>[2] = {};

    if ('categoryId' in data) {
      updateData.id_categorias = data.categoryId ?? null;
    }

    if ('name' in data && data.name !== undefined) {
      updateData.nome = data.name;
    }

    if ('preparationTimeMinutes' in data) {
      updateData.tempo_preparo_minutos = data.preparationTimeMinutes ?? null;
    }

    if ('servings' in data) {
      updateData.porcoes = data.servings ?? null;
    }

    if ('preparationMode' in data && data.preparationMode !== undefined) {
      updateData.modo_preparo = data.preparationMode;
    }

    if ('ingredients' in data) {
      updateData.ingredientes = data.ingredients ?? null;
    }

    const updatedRecipe = await this.recipesRepository.update(
      id,
      userId,
      updateData,
    );

    if (!updatedRecipe) {
      throw new AppError('Receita não encontrada.', 404);
    }

    return this.mapRecipeToResponse(updatedRecipe);
  }

  // Exclui uma receita existente
  async delete(id: number, userId: number): Promise<void> {
    const deletedRows = await this.recipesRepository.delete(id, userId);

    if (!deletedRows) {
      throw new AppError('Receita não encontrada.', 404);
    }
  }

  // Verifica se a categoria existe antes de criar ou atualizar uma receita
  private async ensureCategoryExists(
    categoryId?: number | null,
  ): Promise<void> {
    if (!categoryId) {
      return;
    }

    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('Categoria não encontrada.', 404);
    }
  }

  // Mapeia o modelo de receita do banco de dados para o formato de resposta da API
  private mapRecipeToResponse(recipe: Recipe): RecipeResponse {
    return {
      id: recipe.id,
      userId: recipe.id_usuarios,
      categoryId: recipe.id_categorias,
      name: recipe.nome,
      preparationTimeMinutes: recipe.tempo_preparo_minutos,
      servings: recipe.porcoes,
      preparationMode: recipe.modo_preparo,
      ingredients: recipe.ingredientes,
      createdAt: new Date(recipe.criado_em).toISOString(),
      updatedAt: new Date(recipe.alterado_em).toISOString(),
    };
  }
}
