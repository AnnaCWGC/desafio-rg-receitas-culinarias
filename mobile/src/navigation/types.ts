export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  RecipesList: undefined;
  RecipeDetails: {
    id: number;
  };
  RecipeForm:
    | {
        id?: number;
      }
    | undefined;
};