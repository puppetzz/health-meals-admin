import { EMealPlanFrequency } from '../../enums/MealPlanFrequency';
import { EMealPlanStatus } from '../../enums/MealPlanStatus';

export type TCreateMealPlanRequest = {
  title: string;
  content: string;
  status: EMealPlanStatus;
  frequency: EMealPlanFrequency;
  mealPlanRecipes: TMealPlanRecipeRequest[];
  mealPerDay: number;
};

export type TMealPlanRecipeRequest = {
  recipeId: number;
  day: number;
  meal: number;
};
