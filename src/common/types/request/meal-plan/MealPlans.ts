import { EMealPlanSearchOption } from '../../../enums/MealPlanSearchOption';

export type TMealPlansRequest = {
  page?: number;
  pageSize?: number;
  search?: string;
  searchBy?: EMealPlanSearchOption;
};
