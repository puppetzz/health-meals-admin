import { TMealPlan } from '../MealPlan';

export type MealPlanPagination = {
  data: TMealPlan[];
  page: number;
  total: number;
};
