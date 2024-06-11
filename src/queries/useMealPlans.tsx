import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../common/constants';
import { TMealPlansRequest } from '../common/types/request/meal-plan/MealPlans';
import { getMealPlans } from '../api/meal-plans';

export const useMealPlansQuery = (query: TMealPlansRequest) => {
  return useQuery({
    queryKey: [QueryKey.GET_MEAL_PLANS, query],
    queryFn: async () => {
      return await getMealPlans(query);
    },
  });
};
