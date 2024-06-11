import { API } from '../common/constants';
import { TResponse } from '../common/types';
import { TPost } from '../common/types/Post';
import { TCreateRecipeRequest } from '../common/types/request/recipes/CreateRecipe';
import { TGetRecipesReq } from '../common/types/request/recipes/GetRecipes';
import { TUpdateRecipeRequest } from '../common/types/request/recipes/UpdateRecipe';
import { TPostPaginationResponse } from '../common/types/response/PostPagination';
import axiosClient from '../lib/axiosClient';

export const getRecipes = async (
  getRecipeReq: TGetRecipesReq
): Promise<TResponse<TPostPaginationResponse>> => {
  const response = await axiosClient<TResponse<TPostPaginationResponse>>(
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
