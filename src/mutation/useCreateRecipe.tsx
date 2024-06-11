import { useMutation } from '@tanstack/react-query';
import { TCreateRecipeRequest } from '../common/types/request/recipes/CreateRecipe';
import { createRecipes } from '../api/recipes';

export function useCreateRecipeMutation() {
  return useMutation({
    mutationFn: async (recipe: TCreateRecipeRequest) => {
      const response = await createRecipes(recipe);

      return response;
    },
  });
}
