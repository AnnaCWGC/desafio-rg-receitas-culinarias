import { Request, Response } from 'express';
import { CategoriesService } from './categories.service';

export class CategoriesController {
  private categoriesService: CategoriesService;

  constructor() {
    this.categoriesService = new CategoriesService();
  }

  findAll = async (_request: Request, response: Response): Promise<void> => {
    const categories = await this.categoriesService.findAll();

    response.status(200).json(categories);
  };
}