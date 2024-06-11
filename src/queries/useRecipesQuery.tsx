import { useQuery } from '@tanstack/react-query';
import { TGetRecipesReq } from '../common/types/request/recipes/GetRecipes';
import { QueryKey } from '../common/constants';
import { getRecipes } from '../api/recipes';

export const useRecipesQuery = (query: TGetRecipesReq) => {
  return useQuery({
    queryKey: [QueryKey.GET_RECIPES, query],
    queryFn: async () => {
      return await getRecipes(query);
    },
  });
};
