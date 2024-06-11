import { API } from '../common/constants';
import { TResponse } from '../common/types';
import { TComment } from '../common/types/comment';
import { TMealPlanComment } from '../common/types/MealPlanComment';
import { TCreateCommentRequest } from '../common/types/request/comments/CreateComment';
import { TCreateMealPlanCommentRequest } from '../common/types/request/comments/CreateMealPlanComment';
import axiosClient from '../lib/axiosClient';

export const getCommentByMealPlanId = async (
  mealPlanId: number
): Promise<TResponse<TMealPlanComment[]>> => {
  const response = await axiosClient<TResponse<TMealPlanComment[]>>({
    url: `${API.COMMENTS}/meal-plan/${mealPlanId}`,
    method: 'GET',
  });

  return response.data;
};

export const createMealPlanComment = async (
  createMealPlanCommentRequest: TCreateMealPlanCommentRequest
) => {
  const response = await axiosClient<TResponse<TMealPlanComment>>({
    url: API.MEAL_PLAN_COMMENTS,
    method: 'POST',
    data: createMealPlanCommentRequest,
  });

  return response.data;
};

export const createComment = async (
  createCommentRequest: TCreateCommentRequest
): Promise<TResponse<TComment>> => {
  const response = await axiosClient<TResponse<TComment>>({
    url: API.COMMENTS,
    method: 'POST',
    data: createCommentRequest,
  });

  return response.data;
};
