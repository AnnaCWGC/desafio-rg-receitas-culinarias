import express from 'express';
import cors from 'cors';
import { authRoutes } from './modules/auth/auth.routes';
import { categoriesRoutes } from './modules/categories/categories.routes';
import { recipesRoutes } from './modules/recipes/recipes.routes';
import { errorHandler } from './shared/middlewares/errorHandler';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
  });
});

app.use('/auth', authRoutes);
app.use('/categories', categoriesRoutes);
app.use('/recipes', recipesRoutes);

app.use(errorHandler);