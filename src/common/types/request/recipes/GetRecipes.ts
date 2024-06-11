import { ERecipesSearchOption } from '../../../enums/RecipesSearchOption';

export type TGetRecipesReq = {
  page?: number;
  pageSize?: number;
  categoryId?: number;
  search?: string;
  searchBy?: ERecipesSearchOption;
  category?: string;
  calories?: number[];
  protein?: number[];
  fat?: number[];
  carbs?: number[];
  sodium?: number[];
  fiber?: number[];
  sugar?: number[];
};
