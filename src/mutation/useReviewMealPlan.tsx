'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TReviewUserRequest } from '@/common/types/request/recipes/ReviewRecipe';
import { reviewMealPlan } from '@/api/meal-plans';
import { QueryKey } from '@/common/constants';

export const useReviewMealPlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TReviewUserRequest) => {
      return await reviewMealPlan(data.id, data.status, data.notificationId);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKey.GET_NOTIFICATIONS],
      });
    },
  });
};
