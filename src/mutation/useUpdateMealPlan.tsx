'use client';

import { useMutation } from '@tanstack/react-query';
import { TUpdateMealPlanRequest } from '../common/types/request/meal-plan/UpdateMealPlan';
import { updateMealPlan } from '../api/meal-plans';

export const useUpdateMealPlanMutation = () => {
  return useMutation({
    mutationFn: async (data: TUpdateMealPlanRequest) => {
      return await updateMealPlan(data);
    },
  });
};
