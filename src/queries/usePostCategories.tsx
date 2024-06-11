import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../common/constants/QueryKey';
import { getPostCategories } from '../api/categories';

export const usePostCategoriesQuery = () => {
  return useQuery({
    queryKey: [QueryKey.GET_POST_CATEGORIES],
    queryFn: async () => {
      const data = await getPostCategories();

      return data;
    },
  });
};
