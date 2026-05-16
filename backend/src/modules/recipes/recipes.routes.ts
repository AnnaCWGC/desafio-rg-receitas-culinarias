import { Router } from 'express';
import { ensureAuthenticated } from '../../shared/middlewares/ensureAuthenticated';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { RecipesController } from './recipes.controller';

const recipesRoutes = Router();
const recipesController = new RecipesController();

recipesRoutes.use(asyncHandler(ensureAuthenticated));

recipesRoutes.get('/', asyncHandler(recipesController.findAll));
recipesRoutes.get('/:id', asyncHandler(recipesController.findById));
recipesRoutes.post('/', asyncHandler(recipesController.create));
recipesRoutes.put('/:id', asyncHandler(recipesController.update));
recipesRoutes.delete('/:id', asyncHandler(recipesController.delete));

export { recipesRoutes };