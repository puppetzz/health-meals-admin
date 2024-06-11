import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../common/constants';
import { getMealPlanById } from '../api/meal-plans';

export const useMealPlanByIdQuery = (id: number) => {
  return useQuery({
    queryKey: [QueryKey.GET_MEAL_PLANS_BY_ID, id],
    queryFn: async () => {
      return await getMealPlanById(id);
    },
  });
};
