import { EMealPlanFrequency } from '../../../enums/MealPlanFrequency';
import { TMealPlanRecipesRequest } from './MealPlanRecipes';

export type TUpdateMealPlanRequest = {
  id: number;
  title: string;
  content: string;
  frequency: EMealPlanFrequency;
  mealPerDay: number;
  mealPlanRecipes: TMealPlanRecipesRequest[];
};
