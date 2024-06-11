'use client';

import { Avatar } from '@mantine/core';
import { TPost } from '../../common/types/Post';
import { TNutritionPerMeal } from '../../common/types/form/HealthMetricsTarget';
import { IconEdit } from '@tabler/icons-react';

type RecipeSelectedBoxProps = {
  recipe: TPost;
  setMeal: React.Dispatch<React.SetStateAction<number>>;
  meal: number;
  openSelectedRecipeModal: () => void;
  title: string;
  macronutrientPerMeal?: TNutritionPerMeal;
  setRecipeEditing: React.Dispatch<React.SetStateAction<TPost | undefined>>;
  setCurrentDay?: React.Dispatch<React.SetStateAction<number>>;
  currentDay?: number;
};

export function RecipeSelectedBox({
  recipe,
  setMeal,
  meal,
  openSelectedRecipeModal,
  title,
  macronutrientPerMeal,
  setRecipeEditing,
  setCurrentDay,
  currentDay = 1,
}: RecipeSelectedBoxProps) {
  return (
    <div className="flex h-48 flex-col rounded-xl border-[1px] p-4">
      <div className="flex h-fit justify-between pb-2">
        <div>
          <span className="mr-2 text-lg font-semibold underline">{title}</span>
          <span className="text-lg font-semibold">{`(Bạn cần ${macronutrientPerMeal?.calories}cal, ${macronutrientPerMeal?.protein}g protein, ${macronutrientPerMeal?.fat}g fat, ${macronutrientPerMeal?.carbs}g carbs)`}</span>
        </div>
        {!!recipe && recipe?.id && (
          <span
            className="cursor-pointer text-lg font-semibold underline"
            onClick={() => {
              setMeal(meal);
              setCurrentDay && setCurrentDay(currentDay);
              openSelectedRecipeModal();
              setRecipeEditing(recipe);
            }}
          >
            <IconEdit className="h-5 w-5" />
          </span>
        )}
      </div>
      {!!recipe && recipe?.id ? (
        <div className="flex gap-2">
          <Avatar size="125" src={recipe.thumbnail} radius="md" />
          <div className="flex flex-1 flex-col">
            <div>
              <span className="text-xl font-bold">{recipe.title}</span>
            </div>
            <div className="mt-auto flex w-full justify-between">
              <div className="flex w-[450px] rounded-xl bg-[#ed8537] py-2 text-white">
                <div className="flex w-1/4 flex-col items-center border-r-[0.5px]">
                  <span className="text-xl font-bold">{`${recipe.recipe?.nutrition.calories}cal`}</span>
                  <span className="text-sm font-semibold text-[#f7c7b3]">
                    calories
                  </span>
                </div>
                <div className="flex w-1/4 flex-col items-center border-x-[0.5px]">
                  <span className="text-xl font-bold">{`${recipe.recipe?.nutrition.protein}g`}</span>
                  <span className="text-sm font-semibold text-[#f7c7b3]">
                    protein
                  </span>
                </div>
                <div className="flex w-1/4 flex-col items-center border-x-[0.5px]">
                  <span className="text-xl font-bold">{`${recipe.recipe?.nutrition.fat}g`}</span>
                  <span className="text-sm font-semibold text-[#f7c7b3]">
                    fat
                  </span>
                </div>
                <div className="flex w-1/4 flex-col items-center border-l-[0.5px]">
                  <span className="text-xl font-bold">{`${recipe.recipe?.nutrition.carbohydrates}g`}</span>
                  <span className="text-sm font-semibold text-[#f7c7b3]">
                    carbs
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <a
                  className="cursor-pointer text-lg font-semibold underline"
                  href={`/recipes/${recipe.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Xem chi tiết
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="h-full w-full cursor-pointer rounded-xl bg-[#f9fafb]"
          onClick={() => {
            setMeal(meal);
            setCurrentDay && setCurrentDay(currentDay);
            openSelectedRecipeModal();
          }}
        >
          <span className="flex h-full w-full items-center justify-center font-bold text-gray-500">
            Chọn Công Thức
          </span>
        </div>
      )}
    </div>
  );
}
