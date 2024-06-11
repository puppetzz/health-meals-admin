import { API } from '../common/constants';
import { TResponse } from '../common/types';
import { TFoodCategory } from '../common/types/FoodCategory';
import { TPostCategory } from '../common/types/PostCategory';
import axiosClient from '../lib/axiosClient';

export const getFoodCategories = async (): Promise<
  TResponse<TFoodCategory[]>
> => {
  const response = await axiosClient<TResponse<TFoodCategory[]>>({
    url: API.GET_FOOD_CATEGORIES,
    method: 'GET',
  });

  return response.data;
};

export const getPostCategories = async (): Promise<
  TResponse<TPostCategory[]>
> => {
  const response = await axiosClient.get<TResponse<TPostCategory[]>>(
    API.GET_POST_CATEGORIES
  );

  return response.data;
};
