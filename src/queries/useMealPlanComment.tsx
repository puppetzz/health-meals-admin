'use client';

import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../common/constants';
import { getCommentByMealPlanId } from '../api/comments';

export const useMealPlanCommentQuery = (mealPlanId: number) => {
  return useQuery({
    queryKey: [QueryKey.GET_MEAL_PLAN_COMMENTS, mealPlanId],
    queryFn: async () => {
      const comments = await getCommentByMealPlanId(mealPlanId);

      return comments;
    },
  });
};
