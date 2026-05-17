export type User = {
  id: number;
  name: string | null;
  login: string;
};

export type LoginRequest = {
  login: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  login: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

export type Category = {
  id: number;
  name: string | null;
};

export type Recipe = {
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

export type ListRecipesParams = {
  search?: string;
  categoryId?: number | null;
  page?: number;
  limit?: number;
};

export type CreateRecipeRequest = {
  categoryId?: number | null;
  name: string;
  preparationTimeMinutes?: number | null;
  servings?: number | null;
  preparationMode: string;
  ingredients?: string | null;
};

export type UpdateRecipeRequest = Partial<CreateRecipeRequest>;