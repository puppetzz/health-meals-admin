'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewRecipe } from '../api/recipes';
import { TReviewUserRequest } from '../common/types/request/recipes/ReviewRecipe';
import { QueryKey } from '../common/constants';

export const useReviewRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TReviewUserRequest) => {
      return await reviewRecipe(data.id, data.status, data.notificationId);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKey.GET_NOTIFICATIONS],
      });
    },
  });
};
