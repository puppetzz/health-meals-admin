'use client';

import { Avatar, Input, Modal } from '@mantine/core';
import { useRecipesQuery } from '../../queries';
import { useState } from 'react';
import { TMealPlanRecipeRequest } from '../../common/types/meal-plan/CreateMealPlan';
import { TPost } from '../../common/types/Post';
import { TNutritionPerMeal } from '../../common/types/form/HealthMetricsTarget';

type SearchRecipesModalProps = {
  opened: boolean;
  close: () => void;
  onClickRecipe: (
    mealPlanRecipe: TMealPlanRecipeRequest,
    recipe: TPost,
    day: number,
    meal: number
  ) => void;
  meal: number;
  setTotalMacronutrient: React.Dispatch<
    React.SetStateAction<TNutritionPerMeal>
  >;
  currentDay?: number;
};

export function SearchRecipesModal({
  opened,
  close,
  onClickRecipe,
  meal,
  setTotalMacronutrient,
  currentDay = 1,
}: SearchRecipesModalProps) {
  const [recipeSearchBoxValue, setRecipeSearchBoxValue] = useState('');

  const { data: recipes } = useRecipesQuery({
    search: recipeSearchBoxValue,
  });

  console.log(currentDay);

  return (
    <Modal opened={opened} onClose={close} title="Recipes" size="xl">
      <div className="flex h-[600px] flex-col">
        <div className="mb-5 overscroll-none ">
          <Input
            className=""
            placeholder="Nhập từ khoá"
            size="lg"
            onChange={(event) =>
              setRecipeSearchBoxValue(event.currentTarget.value)
            }
            value={recipeSearchBoxValue}
          />
        </div>
        <div className="flex h-full flex-col gap-3 overflow-auto">
          {recipes?.data.data.map((recipe) => (
            <div
              key={recipe.id}
              className="flex cursor-pointer gap-2 rounded-xl bg-[#f9fafb] p-2"
              onClick={() => {
                onClickRecipe(
                  {
                    recipeId: recipe.id,
                    day: currentDay,
                    meal: meal,
                  },
                  recipe,
                  currentDay - 1,
                  meal - 1
                );
                setTotalMacronutrient((prev) => ({
                  calories:
                    prev.calories + (recipe.recipe?.nutrition.calories || 0),
                  protein:
                    prev.protein + (recipe.recipe?.nutrition.protein || 0),
                  fat: prev.fat + (recipe.recipe?.nutrition.fat || 0),
                  carbs:
                    prev.carbs + (recipe.recipe?.nutrition.carbohydrates || 0),
                }));
                setRecipeSearchBoxValue('');
                close();
              }}
            >
              <Avatar size="125" src={recipe.thumbnail} radius="md" />
              <div className="flex flex-col">
                <div className="h-[60px] overflow-hidden">
                  <span className="text-xl font-bold">{recipe.title}</span>
                </div>
                <div className="mt-auto flex w-[400px] rounded-xl bg-[#ed8537] px-4 py-2 text-white">
                  <div className="flex w-1/4 flex-col items-center border-r-[0.5px]">
                    <span className="text-lg font-semibold">{`${recipe.recipe?.nutrition.calories}cal`}</span>
                    <span className="text-sm font-semibold text-[#f7c7b3]">
                      calories
                    </span>
                  </div>
                  <div className="flex w-1/4 flex-col items-center border-x-[0.5px]">
                    <span className="text-lg font-semibold">{`${recipe.recipe?.nutrition.protein}g`}</span>
                    <span className="text-sm font-semibold text-[#f7c7b3]">
                      protein
                    </span>
                  </div>
                  <div className="flex w-1/4 flex-col items-center border-x-[0.5px]">
                    <span className="text-lg font-semibold">{`${recipe.recipe?.nutrition.fat}g`}</span>
                    <span className="text-sm font-semibold text-[#f7c7b3]">
                      fat
                    </span>
                  </div>
                  <div className="flex w-1/4 flex-col items-center border-l-[0.5px]">
                    <span className="text-lg font-semibold">{`${recipe.recipe?.nutrition.carbohydrates}g`}</span>
                    <span className="text-sm font-semibold text-[#f7c7b3]">
                      carbs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
