import { z } from 'zod';

const nullablePositiveInt = z.preprocess(
  (value) => {
    if (value === undefined || value === null || value === '') {
      return null;
    }

    return value;
  },
  z.coerce.number().int().positive().nullable(),
);

export const listRecipesQuerySchema = z.object({
  search: z.string().trim().optional(),
  categoryId: nullablePositiveInt.optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export const recipeParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createRecipeBodySchema = z.object({
  categoryId: nullablePositiveInt.optional(),
  name: z.string().trim().min(2).max(45),
  preparationTimeMinutes: nullablePositiveInt.optional(),
  servings: nullablePositiveInt.optional(),
  preparationMode: z.string().trim().min(5),
  ingredients: z.string().trim().optional().nullable(),
});

export const updateRecipeBodySchema = createRecipeBodySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe pelo menos um campo para atualização.',
  });

export type ListRecipesQuery = z.infer<typeof listRecipesQuerySchema>;
export type CreateRecipeBody = z.infer<typeof createRecipeBodySchema>;
export type UpdateRecipeBody = z.infer<typeof updateRecipeBodySchema>;