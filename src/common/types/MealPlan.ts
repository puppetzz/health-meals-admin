import { EMealPlanFrequency } from '../enums/MealPlanFrequency';
import { EMealPlanStatus } from '../enums/MealPlanStatus';
import { TMealPlanRecipe } from './MealPlanRecipe';
import { TUser } from './User';

export type TMealPlan = {
  id: number;
  authorId: string;
  title: string;
  content: string;
  status: EMealPlanStatus;
  frequency: EMealPlanFrequency;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  mealPerDay: number;
  rating: number;
  numberOfComments?: number;
  numberOfReviews?: number;
  mealPlanRecipe: TMealPlanRecipe[];
  author: TUser;
};
