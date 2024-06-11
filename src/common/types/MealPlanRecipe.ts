import { TRecipe } from './Recipes';

export type TMealPlanRecipe = {
  id: number;
  mealPlanId: string;
  recipeId: number;
  day: number;
  meal: number;
  recipe: TRecipe;
};
