'use client';

import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../common/constants';
import { getFoodCategories } from '../api/categories';

export const useFoodCategoriesQuery = () => {
  return useQuery({
    queryKey: [QueryKey.GET_FOOD_CATEGORIES],
    queryFn: async () => {
      return await getFoodCategories();
    },
  });
};
