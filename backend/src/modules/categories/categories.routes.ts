import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { CategoriesController } from './categories.controller';

const categoriesRoutes = Router();
const categoriesController = new CategoriesController();

categoriesRoutes.get('/', asyncHandler(categoriesController.findAll));

export { categoriesRoutes };