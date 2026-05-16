import { Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';
import {
  createRecipeBodySchema,
  listRecipesQuerySchema,
  recipeParamsSchema,
  updateRecipeBodySchema,
} from './recipes.schemas';
import { RecipesService } from './recipes.service';

export class RecipesController {
  private recipesService: RecipesService;

  constructor() {
    this.recipesService = new RecipesService();
  }

  findAll = async (request: Request, response: Response): Promise<void> => {
    const userId = this.getAuthenticatedUserId(request);
    const query = listRecipesQuerySchema.parse(request.query);

    const recipes = await this.recipesService.findAll(userId, query);

    response.status(200).json(recipes);
  };

  findById = async (request: Request, response: Response): Promise<void> => {
    const userId = this.getAuthenticatedUserId(request);
    const { id } = recipeParamsSchema.parse(request.params);

    const recipe = await this.recipesService.findById(id, userId);

    response.status(200).json(recipe);
  };

  create = async (request: Request, response: Response): Promise<void> => {
    const userId = this.getAuthenticatedUserId(request);
    const data = createRecipeBodySchema.parse(request.body);

    const recipe = await this.recipesService.create(userId, data);

    response.status(201).json(recipe);
  };

  update = async (request: Request, response: Response): Promise<void> => {
    const userId = this.getAuthenticatedUserId(request);
    const { id } = recipeParamsSchema.parse(request.params);
    const data = updateRecipeBodySchema.parse(request.body);

    const recipe = await this.recipesService.update(id, userId, data);

    response.status(200).json(recipe);
  };

  delete = async (request: Request, response: Response): Promise<void> => {
    const userId = this.getAuthenticatedUserId(request);
    const { id } = recipeParamsSchema.parse(request.params);

    await this.recipesService.delete(id, userId);

    response.status(204).send();
  };

  private getAuthenticatedUserId(request: Request): number {
    const userId = request.user?.id;

    if (!userId) {
      throw new AppError('Usuário não autenticado.', 401);
    }

    return userId;
  }
}