import { TIngredient } from './Ingredients';
import { TNutrition } from './Nutrition';
import { TPost } from './Post';
import { TRecipeFoodCategory } from './RecipeFoodCategory';

export type TRecipe = {
  id: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  servingSize: number;
  calculationUnit: string;
  freezer: string;
  keeping: string;
  nutrition: TNutrition;
  recipeFoodCategory: TRecipeFoodCategory[];
  ingredient: TIngredient[];
  post?: TPost;
};
