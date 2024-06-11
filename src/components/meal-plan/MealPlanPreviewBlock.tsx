import { TPost } from '@/common/types/Post';
import { List } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Image from 'next/image';

type MealPlanPreviewBlockProps = {
  recipe: TPost;
  meal: number;
};

export function MealPlanPreviewBlock({
  recipe,
  meal,
}: MealPlanPreviewBlockProps) {
  return (
    <div className="w-full rounded-xl border-[1px] p-5 ">
      <div className="mb-5 flex justify-between">
        <div className="flex gap-2">
          <Image
            src="/svg/fork-and-knife.svg"
            alt="Fork and knife"
            width={28}
            height={28}
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#6B7280]">{`Công thức ${meal}`}</span>
            <a
              className="text-2xl font-bold underline"
              href={`/recipes/${recipe.id}`}
            >
              {recipe.title}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/svg/fire.svg" alt="Fire" width={16} height={16} />
          <span className="text-xl font-semibold">{`${recipe.recipe?.nutrition.calories}Cal`}</span>
        </div>
      </div>

      <div className="flex w-full gap-5">
        <div className="h-[350px] w-[50%]">
          <img
            src={recipe.thumbnail}
            alt=""
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-xl font-bold">Nguyên Liệu</span>
          <List listStyleType="disc">
            {recipe.recipe?.ingredient &&
              recipe.recipe?.ingredient
                .slice(0, 8)
                .map((ingredient) => (
                  <List.Item key={ingredient.id}>
                    {`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
                  </List.Item>
                ))}
            {recipe.recipe?.ingredient?.length &&
              recipe.recipe?.ingredient?.length > 8 && (
                <List.Item>...</List.Item>
              )}
          </List>
          <div className="mt-auto">
            <div className="mb-2 flex justify-end">
              <a
                className="flex items-center gap-1 font-bold underline"
                href={`/recipes/${recipe.id}`}
              >
                Xem chi tiết
                <IconChevronRight className="h-4 w-4" />
              </a>
            </div>
            <div className="h-fit w-full rounded-lg bg-[#ed8537] p-5 text-white">
              <div className="flex justify-between">
                <div className="flex flex-col font-semibold">
                  <span className="text-sm text-[#f7c7b3]">Calories</span>
                  <span className="text-xl">{`${recipe.recipe?.nutrition.calories}Cal`}</span>
                </div>
                <div className="flex flex-col font-semibold">
                  <span className="text-sm text-[#f7c7b3]">Protein</span>
                  <span className="text-xl">{`${recipe.recipe?.nutrition.protein}g`}</span>
                </div>
                <div className="flex flex-col font-semibold">
                  <span className="text-sm text-[#f7c7b3]">Fats</span>
                  <span className="text-xl">{`${recipe.recipe?.nutrition.fat}g`}</span>
                </div>
                <div className="flex flex-col font-semibold">
                  <span className="text-sm text-[#f7c7b3]">Carbs</span>
                  <span className="text-xl">{`${recipe.recipe?.nutrition.carbohydrates}g`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
