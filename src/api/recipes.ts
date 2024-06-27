import { API } from '../common/constants';
import { EReviewStatus } from '../common/enums/review-recipe-status.enum';
import { TResponse } from '../common/types';
import { TPost } from '../common/types/Post';
import { TCreateRecipeRequest } from '../common/types/request/recipes/CreateRecipe';
import { TGetRecipesReq } from '../common/types/request/recipes/GetRecipes';
import { TUpdateRecipeRequest } from '../common/types/request/recipes/UpdateRecipe';
import { TPostPaginationResponse } from '../common/types/response/PostPagination';
import { TRecipesPaginationResponse } from '../common/types/response/RecipesPagination';
import axiosClient from '../lib/axiosClient';

export const getRecipes = async (
  getRecipeReq: TGetRecipesReq
): Promise<TResponse<TRecipesPaginationResponse>> => {
  const response = await axiosClient<TResponse<TRecipesPaginationResponse>>(
    API.RECIPES,
    {
      params: getRecipeReq,
    }
  );

  return response.data;
};

export const getRecipeById = async (id: string): Promise<TResponse<TPost>> => {
  const response = await axiosClient<TResponse<TPost>>({
    url: `${API.RECIPES}/${id}`,
    method: 'GET',
  });

  return response.data;
};

export const createRecipes = async (data: TCreateRecipeRequest) => {
  const response = await axiosClient({
    url: API.RECIPES,
    method: 'POST',
    data,
  });

  return response.data;
};

export const updateRecipes = async (data: TUpdateRecipeRequest) => {
  const response = await axiosClient({
    url: API.RECIPES,
    method: 'PUT',
    data,
  });

  return response.data;
};

export const reviewRecipe = async (
  id: number,
  status: EReviewStatus,
  notificationId: number
) => {
  const response = await axiosClient({
    url: `${API.REVIEW_RECIPES}/${id}`,
    method: 'PUT',
    data: {
      status,
      notificationId,
    },
  });

  return response.data;
};
