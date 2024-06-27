'use client';

import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../common/constants/QueryKey';
import { getRecipeById } from '../api/recipes';

export const useRecipeByIdQuery = (id?: string, enable = true) => {
  return useQuery({
    queryKey: [QueryKey.GET_RECIPE_BY_ID, { id }],
    queryFn: async () => {
      if (!id) return;

      const recipe = await getRecipeById(id);

      return recipe;
    },
    enabled: !!id && enable,
  });
};
