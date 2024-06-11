import { useMutation } from '@tanstack/react-query';
import { updateRecipes } from '../api/recipes';
import { TUpdateRecipeRequest } from '../common/types/request/recipes/UpdateRecipe';

export function useUpdateRecipeMutation() {
  return useMutation({
    mutationFn: async (recipe: TUpdateRecipeRequest) => {
      const response = await updateRecipes(recipe);

      return response;
    },
  });
}
