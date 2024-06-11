import { EMealPlanFrequency } from "../../enums/MealPlanFrequency";
import { TMacronutrient } from "../response/health-metric-tdee";

export type THealthMetricsTarget = {
  tdee: number;
  macronutrient: TMacronutrient;
  detailCaloriesOfMeals: TDetailCaloriesOfMeals;
};

export type TDetailCaloriesOfMeals = {
  breakfast: TNutritionPerMeal;
  lunch: TNutritionPerMeal;
  dinner: TNutritionPerMeal;
  snacks?: TNutritionPerMeal[];
};

export type TNutritionPerMeal = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};
