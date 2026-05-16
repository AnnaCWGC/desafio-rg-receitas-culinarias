import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { authRoutes } from './modules/auth/auth.routes';
import { categoriesRoutes } from './modules/categories/categories.routes';
import { recipesRoutes } from './modules/recipes/recipes.routes';
import { swaggerSpec } from './docs/swagger';
import { errorHandler } from './shared/middlewares/errorHandler';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
  });
});

app.get('/api-docs.json', (_request, response) => {
  response.status(200).json(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoutes);
app.use('/categories', categoriesRoutes);
app.use('/recipes', recipesRoutes);

app.use(errorHandler);