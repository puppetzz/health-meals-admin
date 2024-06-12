import { TRecipe } from '../Recipes';

export type TRecipesPaginationResponse = {
  recipes: TRecipe[];
  page: number;
  total: number;
};
