'use client';

import '../../../styles/recipe.css';
import { Anchor, Breadcrumbs, Button, List, Rating } from '@mantine/core';
import { useRecipeByIdQuery } from '../../../queries';
import Image from 'next/image';
import { ENutritionUnit } from '../../../common/enums/NutritionUnit';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { IconClock, IconHeart, IconPrinter } from '@tabler/icons-react';

const BlockNoteViewOnly = dynamic(
  () =>
    import('../../../components/blog/BlockNoteViewOnly').then(
      (mod) => mod.default
    ),
  {
    ssr: false,
  }
);

export default function RecipePage({ params }: { params: { id: string } }) {
  const { data: recipe } = useRecipeByIdQuery(params.id);

  const publishedAt = useMemo(() => {
    if (!recipe?.data.publishedAt) return '';

    return dayjs(recipe.data.publishedAt).format('MMM DD, YYYY');
  }, [recipe?.data.publishedAt]);

  const updateAt = useMemo(() => {
    if (!recipe?.data.updatedAt)
      return dayjs(recipe?.data.createAt).format('MMM DD, YYYY');

    return dayjs(recipe?.data.updatedAt).format('MMM DD, YYYY');
  }, [recipe?.data.updatedAt]);

  const handleJumpToRecipe = () => {
    const element = document.querySelector('#recipes');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mx-auto flex max-w-[1200px] px-7 mt-10">
      <div className="mb-32 mr-7 flex-1">
        <div className="flex h-20 items-center justify-between">
          <div className="flex h-full flex-col justify-between">
            <Breadcrumbs>
              <Anchor href="/recipes" className="text-gray-500">
                Recipes
              </Anchor>
              <span className="w-[25vw] cursor-pointer overflow-hidden truncate">
                {recipe?.data?.title}
              </span>
            </Breadcrumbs>
            <div>
              {recipe?.data.recipe?.recipeFoodCategory.map((foodCategory) => (
                <span
                  key={foodCategory.foodCategory.id}
                  className="mr-2 rounded-full bg-gray-200 px-3 py-[2px] text-sm"
                >
                  {foodCategory.foodCategory.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <img
              src={recipe?.data.author?.picture}
              alt="author avatar"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-400">Tác giả:</span>
              <span className="font-semibold">
                {recipe?.data.author?.fullName}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-5xl font-bold">{recipe?.data.title}</span>
        </div>
        <div className="mt-5 w-full">
          <img
            src={recipe?.data.thumbnail}
            alt=""
            className="h-[550px] w-full rounded-xl object-cover"
          />
        </div>
        <div className="mt-4 text-sm font-semibold">
          <div>
            <span>Xuất bản lúc: </span>
            <span className="text-gray-500">{publishedAt}</span>
          </div>
          <div>
            <span>Cập nhật lần cuối: </span>
            <span className="text-gray-500">{updateAt}</span>
          </div>
        </div>
        <div className="mt-5">
          <BlockNoteViewOnly content={recipe?.data.content as string} />
        </div>

        <div id="recipes">
          <div className="flex justify-between p-5">
            <div>
              <div>
                <span className="text-4xl font-bold">{recipe?.data.title}</span>
              </div>
              <div className="mt-5 flex gap-4">
                <img
                  src={recipe?.data.author?.picture}
                  alt="author avatar"
                  className="h-14 w-14 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-400">Tác giả:</span>
                  <span className="font-semibold">
                    {recipe?.data.author?.fullName}
                  </span>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-1">
                <div className="flex items-center">
                  <span className="w-40 text-lg font-semibold">
                    Số khẩu phần
                  </span>
                  <div className="flex gap-1">
                    <span className="">{recipe?.data.recipe?.servings}</span>
                    <span>{`(~ 1 ${recipe?.data.recipe?.calculationUnit} khẩu phần)`}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-40 text-lg font-semibold">
                    Mỗi khẩu phần
                  </span>
                  <span>{`${recipe?.data.recipe?.servingSize}g`}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-40 text-lg font-semibold">
                    Thời gian để lại
                  </span>
                  <span>{recipe?.data.recipe?.keeping}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex h-10 w-52 items-center justify-center gap-2 border-[1px] border-black">
                <IconPrinter className="h-6 w-6" />
                <span>In</span>
              </div>
              <div className="flex h-10 w-52 items-center justify-center gap-2 border-[1px] border-black">
                <IconHeart className="h-6 w-6" />
                <span>Lưu lại</span>
              </div>
              <div>
                <img
                  src={recipe?.data.thumbnail}
                  alt=""
                  className="h-52 w-52 object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-end">
                  <Rating readOnly size="lg" value={recipe?.data.rating} />
                </div>
                <div className="flex justify-end text-sm">
                  <span>{`${recipe?.data.rating || 0} từ ${
                    recipe?.data.numberOfReviews
                  } đánh giá`}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex w-1/2 flex-col items-center border-y-[1px] border-r-[1px] border-black">
              <span className="font-semibold uppercase">
                Thời gian chuẩn bị
              </span>
              <span>
                <span className="mr-1 text-xl font-bold">
                  {recipe?.data.recipe?.prepTime}
                </span>
                <span className="text-xs">phút</span>
              </span>
            </div>
            <div className="flex w-1/2 flex-col items-center border-y-[1px] border-black">
              <span className="font-semibold uppercase">
                thời gian chế biến
              </span>
              <span>
                <span className="mr-1 text-xl font-bold">
                  {recipe?.data.recipe?.cookTime}
                </span>
                <span className="text-xs">phút</span>
              </span>
            </div>
          </div>
          <div className="mt-5">
            <span className="text-xl font-semibold">Thành Phần</span>
            <List className="mt-5 pl-5" listStyleType="disc">
              {recipe?.data.recipe?.ingredient?.map((ingredient) => (
                <List.Item
                  key={ingredient.id}
                >{`${ingredient.amount} ${ingredient.unit} ${ingredient.name} ${ingredient.description}`}</List.Item>
              ))}
            </List>
          </div>
          <div className="mt-5">
            <span className="text-xl font-semibold">{`Dinh Dưỡng (1 trong ${recipe?.data.recipe?.servings} khẩu phần)`}</span>
            <div className="flex flex-wrap break-words">
              {!!recipe?.data.recipe?.nutrition.calories && (
                <div className="mr-3">
                  <span className="font-semibold">Calo: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.calories}${ENutritionUnit.CALORIES}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.carbohydrates && (
                <div className="mr-3">
                  <span className="font-semibold">Carbohydrates: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.carbohydrates}${ENutritionUnit.CARBOHYDRATES}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.protein && (
                <div className="mr-3">
                  <span className="font-semibold">Đạm: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.protein}${ENutritionUnit.PROTEIN}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.fat && (
                <div className="mr-3">
                  <span className="font-semibold">Chất béo: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.fat}${ENutritionUnit.FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.saturatedFat && (
                <div className="mr-3">
                  <span className="font-semibold">Chất béo bão hoà: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.saturatedFat}${ENutritionUnit.SATURATED_FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.polyunsaturatedFat && (
                <div className="mr-3">
                  <span className="font-semibold">
                    Chất béo không bão hòa đa:{' '}
                  </span>
                  <span>{`${recipe?.data.recipe?.nutrition.polyunsaturatedFat}${ENutritionUnit.POLYUNSATURATED_FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.monounsaturatedFat && (
                <div className="mr-3">
                  <span className="font-semibold">
                    Chất béo không bão hòa đơn:{' '}
                  </span>
                  <span>{`${recipe?.data.recipe?.nutrition.monounsaturatedFat}${ENutritionUnit.MONOUNSATURATED_FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.transFat && (
                <div className="mr-3">
                  <span className="font-semibold">Chất béo Trans: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.transFat}${ENutritionUnit.TRANS_FAT}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.cholesterol && (
                <div className="mr-3">
                  <span className="font-semibold">Cholesterol: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.cholesterol}${ENutritionUnit.CHOLESTEROL}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.sodium && (
                <div className="mr-3">
                  <span className="font-semibold">Natri: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.sodium}${ENutritionUnit.SODIUM}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.potassium && (
                <div className="mr-3">
                  <span className="font-semibold">Kali: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.potassium}${ENutritionUnit.POTASSIUM}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.fiber && (
                <div className="mr-3">
                  <span className="font-semibold">Chất xơ: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.fiber}${ENutritionUnit.FIBER}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.sugar && (
                <div className="mr-3">
                  <span className="font-semibold">Đường: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.sugar}${ENutritionUnit.SUGAR}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.vitaminA && (
                <div className="mr-3">
                  <span className="font-semibold">Vitamin A: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.vitaminA}${ENutritionUnit.VITAMIN_A}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.vitaminC && (
                <div className="mr-3">
                  <span className="font-semibold">Vitamin C: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.vitaminC}${ENutritionUnit.VITAMIN_C}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.calcium && (
                <div className="mr-3">
                  <span className="font-semibold">Canxi: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.calcium}${ENutritionUnit.CALCIUM}`}</span>
                </div>
              )}
              {!!recipe?.data.recipe?.nutrition.iron && (
                <div className="mr-3">
                  <span className="font-semibold">Sắt: </span>
                  <span>{`${recipe?.data.recipe?.nutrition.iron}${ENutritionUnit.IRON}`}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[300px]">
        <div className="h-fit w-full rounded-xl bg-white p-4 font-semibold">
          <div className="mb-1 mt-5">
            <span className="text-lg">Chi tiết</span>
          </div>
          <div className="flex items-center gap-5">
            <IconClock className="h-7 w-7 text-gray-400" />
            <div className="flex flex-col">
              <span className="text-gray-400">Chuẩn bị</span>
              <span>{`${recipe?.data.recipe?.prepTime} phút`}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">Nấu</span>
              <span>{`${recipe?.data.recipe?.cookTime} phút`}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">Tổng</span>
              <span>{`${
                (recipe?.data.recipe?.prepTime || 0) +
                (recipe?.data.recipe?.cookTime || 0)
              } phút`}</span>
            </div>
          </div>
          <div className="mb-1 mt-2 flex w-full justify-between">
            <span className="text-gray-400">số khẩu phần</span>
            <span>{recipe?.data.recipe?.servings}</span>
          </div>
          {!!recipe?.data.recipe?.servingSize && (
            <div className="mb-1 flex justify-between">
              <span className="text-gray-400">mỗi khẩu phần</span>
              <span>{`${recipe?.data.recipe?.servingSize}g`}</span>
            </div>
          )}
          <div className="mb-1 mt-3">
            <span>Dinh dưỡng trong một khẩu phần</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Calo</span>
              <span className="flex gap-2">
                <Image
                  src="/svg/fire.svg"
                  alt="fire"
                  width={12}
                  height={12}
                  className="mb-1"
                />
                {recipe?.data.recipe?.nutrition.calories}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Đạm</span>
              <span>{`${recipe?.data.recipe?.nutrition.protein}${ENutritionUnit.CALORIES}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Chất béo</span>
              <span>{`${recipe?.data.recipe?.nutrition.fat}${ENutritionUnit.FAT}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Carbs</span>
              <span>{`${recipe?.data.recipe?.nutrition.carbohydrates}${ENutritionUnit.CARBOHYDRATES}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Natri</span>
              <span>{`${recipe?.data.recipe?.nutrition.sodium}${ENutritionUnit.SODIUM}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Chất xơ</span>
              <span>{`${recipe?.data.recipe?.nutrition.fiber}${ENutritionUnit.FIBER}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Đường</span>
              <span>{`${recipe?.data.recipe?.nutrition.sugar}${ENutritionUnit.SUGAR}`}</span>
            </div>
          </div>
          <div className="rotate-image mb-2 mt-4 flex w-full justify-center">
            <Button
              className="bg-[#586476] hover:opacity-95"
              size="md"
              onClick={handleJumpToRecipe}
            >
              <span className="transition-transform duration-500">
                <Image
                  src="/svg/fork-and-knife.svg"
                  alt="fork-and-knife"
                  height={24}
                  width={24}
                />
              </span>
              <span className="ml-2">Đi đến công thức</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
