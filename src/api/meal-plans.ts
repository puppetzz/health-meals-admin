import { API } from '../common/constants';
import { TResponse } from '../common/types';
import { TCreateMealPlanRequest } from '../common/types/meal-plan/CreateMealPlan';
import { TMealPlan } from '../common/types/MealPlan';
import { TMealPlansRequest } from '../common/types/request/meal-plan/MealPlans';
import { MealPlanPagination } from '../common/types/response/MealPlanPagination';
import axiosClient from '../lib/axiosClient';

export const getMealPlans = async (
  query: TMealPlansRequest
): Promise<TResponse<MealPlanPagination>> => {
  const response = await axiosClient<TResponse<MealPlanPagination>>({
    url: API.MEAL_PLANS,
    method: 'GET',
    params: query,
  });

  return response.data;
};

export const getMealPlanById = async (id: number) => {
  const response = await axiosClient<TResponse<TMealPlan>>({
    url: `${API.MEAL_PLANS}/${id}`,
    method: 'GET',
  });
  return response.data;
};

export const createMealPlan = async (data: TCreateMealPlanRequest) => {
  const response = await axiosClient<TResponse<TMealPlan>>({
    url: API.MEAL_PLANS,
    method: 'POST',
    data,
  });

  return response.data;
};

export const deleteMealPlan = async (id: number) => {
  const response = await axiosClient<TResponse<null>>({
    url: `${API.MEAL_PLANS}/${id}`,
    method: 'DELETE',
  });

  return response.data;
};