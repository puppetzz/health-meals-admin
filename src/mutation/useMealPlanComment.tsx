'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TCreateMealPlanCommentRequest } from '../common/types/request/comments/CreateMealPlanComment';
import { createMealPlanComment } from '../api/comments';
import { QueryKey } from '../common/constants';

export const useMealPlanCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      createMealPlanCommentRequest: TCreateMealPlanCommentRequest
    ) => {
      const response = await createMealPlanComment(
        createMealPlanCommentRequest
      );

      return response;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKey.GET_MEAL_PLAN_COMMENTS],
      });
    },
  });
};
