'use client';

import {
  Avatar,
  Box,
  Button,
  Collapse,
  Group,
  List,
  Modal,
  Pill,
} from '@mantine/core';
import { TPost } from '@/common/types/Post';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import { ENutritionUnit } from '@/common/enums/NutritionUnit';
import { useReviewMealPlanMutation, useReviewRecipeMutation } from '@/mutation';
import { useCallback, useMemo, useState } from 'react';
import { EReviewStatus } from '@/common/enums/review-recipe-status.enum';
import { TMealPlan } from '@/common/types/MealPlan';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { RecipeBlock } from '../meal-plan/RecipeBlock';
import { EMealPlanFrequency } from '@/common/enums/MealPlanFrequency';

const BlockNoteViewOnly = dynamic(
  () =>
    import('@/components/blog/BlockNoteViewOnly').then((mod) => mod.default),
  {
    ssr: false,
  }
);

type RecipeReviewModalProps = {
  opened: boolean;
  close: () => void;
  recipe?: TPost;
  mealPlan?: TMealPlan;
  notificationId: number;
  isReviewRecipe: boolean;
};

export function ReviewModal({
  opened,
  close,
  recipe,
  mealPlan,
  notificationId,
  isReviewRecipe,
}: RecipeReviewModalProps) {
  const reviewRecipeMutation = useReviewRecipeMutation();
  const reviewMealPlanMutation = useReviewMealPlanMutation();
  const [openedMealPlan, setOpenedMealPlan] = useState<boolean[]>(
    [...Array(7)].map(() => true)
  );

  const handleReviewRecipe = useCallback(
    (id: number, status: EReviewStatus) => {
      console.log(status);
      reviewRecipeMutation.mutate({
        id,
        status,
        notificationId,
      });
    },
    [reviewRecipeMutation, notificationId]
  );

  const handleReviewMealPlan = useCallback(
    (id: number, status: EReviewStatus) => {
      reviewMealPlanMutation.mutate({
        id,
        status,
        notificationId,
      });
    },
    [reviewMealPlanMutation, notificationId]
  );

  const mealPerDay = useMemo(() => {
    if (!mealPlan?.mealPlanRecipe) return [];

    const result = [];

    for (const mealPlanRecipe of mealPlan?.mealPlanRecipe) {
      if (!result[mealPlanRecipe.day - 1]) {
        result[mealPlanRecipe.day - 1] = [mealPlanRecipe];
      } else {
        result[mealPlanRecipe.day - 1].push(mealPlanRecipe);
      }
    }

    return result;
  }, [mealPlan?.mealPlanRecipe]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={isReviewRecipe ? 'Công Thức' : 'Kế Hoạch Cho Bữa Ăn'}
      size="xl"
    >
      {isReviewRecipe ? (
        <div className="relative h-full">
          <div className="w-full h-[750px] overflow-auto pb-[56px]">
            <div className="flex justify-between">
              {recipe?.recipe?.recipeFoodCategory.map((category, index) => (
                <Pill key={index} className="font-semibold">
                  {category.foodCategory.name}
                </Pill>
              ))}

              <div className="flex gap-2 items-center">
                <Avatar src={recipe?.author?.picture} />
                <div className="flex flex-col font-semibold">
                  <span className="text-gray-400">Tác giả:</span>
                  <span>{recipe?.author?.fullName}</span>
                </div>
              </div>
            </div>
            <h2 className="font-bold text-2xl">{recipe?.title}</h2>
            <img
              src={recipe?.thumbnail}
              alt="thumbnail"
              className="w-full h-[300px] object-cover rounded-xl"
            />
            <div className="font-semibold py-2">
              <span>Đăng lúc: </span>
              <span className="text-gray-500">
                {dayjs(recipe?.createAt).format('MMM DD, YYYY')}
              </span>
            </div>
            <div className="mx-2">
              <BlockNoteViewOnly content={recipe?.content || ''} />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Chi Tiết</h3>
              <div className="flex justify-between">
                <div>
                  <div className="flex mt-2">
                    <div className="w-[200px]">
                      <span className="font-semibold">Khẩu Phần</span>
                    </div>
                    <span>{recipe?.recipe?.servings}</span>
                  </div>
                  <div className="flex">
                    <div className="w-[200px]">
                      <span className="font-semibold">Mỗi khẩu phần</span>
                    </div>
                    <span>{recipe?.recipe?.servingSize}g</span>
                  </div>
                  <div className="flex">
                    <div className="w-[200px]">
                      <span className="font-semibold">
                        Có thể bảo quản trong
                      </span>
                    </div>
                    <span>{recipe?.recipe?.keeping}</span>
                  </div>
                </div>
                <div className="mr-10">
                  <div className="flex">
                    <div className="w-[150px]">
                      <span className="font-semibold">Thời gian chuẩn bị</span>
                    </div>
                    <span>{recipe?.recipe?.prepTime} phút</span>
                  </div>
                  <div className="flex">
                    <div className="w-[150px]">
                      <span className="font-semibold">Thời gian nấu</span>
                    </div>
                    <span>{recipe?.recipe?.prepTime} phút</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="font-semibold text-xl">Thành Phần</h3>
              <List className="mt-2 pl-5" listStyleType="disc">
                {recipe?.recipe?.ingredient?.map((ingredient) => (
                  <List.Item
                    key={ingredient.id}
                  >{`${ingredient.amount} ${ingredient.unit} ${ingredient.name} ${ingredient.description}`}</List.Item>
                ))}
              </List>
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-semibold">{`Dinh Dưỡng (1 trong ${recipe?.recipe?.servings} khẩu phần)`}</h3>
              <div className="flex flex-wrap break-words mt-2">
                {!!recipe?.recipe?.nutrition.calories && (
                  <div className="mr-3">
                    <span className="font-semibold">Calo: </span>
                    <span>{`${recipe?.recipe?.nutrition.calories}${ENutritionUnit.CALORIES}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.carbohydrates && (
                  <div className="mr-3">
                    <span className="font-semibold">Carbohydrates: </span>
                    <span>{`${recipe?.recipe?.nutrition.carbohydrates}${ENutritionUnit.CARBOHYDRATES}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.protein && (
                  <div className="mr-3">
                    <span className="font-semibold">Đạm: </span>
                    <span>{`${recipe?.recipe?.nutrition.protein}${ENutritionUnit.PROTEIN}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.fat && (
                  <div className="mr-3">
                    <span className="font-semibold">Chất béo: </span>
                    <span>{`${recipe?.recipe?.nutrition.fat}${ENutritionUnit.FAT}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.saturatedFat && (
                  <div className="mr-3">
                    <span className="font-semibold">Chất béo bão hoà: </span>
                    <span>{`${recipe?.recipe?.nutrition.saturatedFat}${ENutritionUnit.SATURATED_FAT}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.polyunsaturatedFat && (
                  <div className="mr-3">
                    <span className="font-semibold">
                      Chất béo không bão hòa đa:{' '}
                    </span>
                    <span>{`${recipe?.recipe?.nutrition.polyunsaturatedFat}${ENutritionUnit.POLYUNSATURATED_FAT}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.monounsaturatedFat && (
                  <div className="mr-3">
                    <span className="font-semibold">
                      Chất béo không bão hòa đơn:{' '}
                    </span>
                    <span>{`${recipe?.recipe?.nutrition.monounsaturatedFat}${ENutritionUnit.MONOUNSATURATED_FAT}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.transFat && (
                  <div className="mr-3">
                    <span className="font-semibold">Chất béo Trans: </span>
                    <span>{`${recipe?.recipe?.nutrition.transFat}${ENutritionUnit.TRANS_FAT}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.cholesterol && (
                  <div className="mr-3">
                    <span className="font-semibold">Cholesterol: </span>
                    <span>{`${recipe?.recipe?.nutrition.cholesterol}${ENutritionUnit.CHOLESTEROL}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.sodium && (
                  <div className="mr-3">
                    <span className="font-semibold">Natri: </span>
                    <span>{`${recipe?.recipe?.nutrition.sodium}${ENutritionUnit.SODIUM}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.potassium && (
                  <div className="mr-3">
                    <span className="font-semibold">Kali: </span>
                    <span>{`${recipe?.recipe?.nutrition.potassium}${ENutritionUnit.POTASSIUM}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.fiber && (
                  <div className="mr-3">
                    <span className="font-semibold">Chất xơ: </span>
                    <span>{`${recipe?.recipe?.nutrition.fiber}${ENutritionUnit.FIBER}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.sugar && (
                  <div className="mr-3">
                    <span className="font-semibold">Đường: </span>
                    <span>{`${recipe?.recipe?.nutrition.sugar}${ENutritionUnit.SUGAR}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.vitaminA && (
                  <div className="mr-3">
                    <span className="font-semibold">Vitamin A: </span>
                    <span>{`${recipe?.recipe?.nutrition.vitaminA}${ENutritionUnit.VITAMIN_A}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.vitaminC && (
                  <div className="mr-3">
                    <span className="font-semibold">Vitamin C: </span>
                    <span>{`${recipe?.recipe?.nutrition.vitaminC}${ENutritionUnit.VITAMIN_C}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.calcium && (
                  <div className="mr-3">
                    <span className="font-semibold">Canxi: </span>
                    <span>{`${recipe?.recipe?.nutrition.calcium}${ENutritionUnit.CALCIUM}`}</span>
                  </div>
                )}
                {!!recipe?.recipe?.nutrition.iron && (
                  <div className="mr-3">
                    <span className="font-semibold">Sắt: </span>
                    <span>{`${recipe?.recipe?.nutrition.iron}${ENutritionUnit.IRON}`}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 flex justify-center gap-20 w-full bg-white h-[52px] items-end">
            <Button
              color="red"
              onClick={() => {
                if (recipe?.recipe?.id)
                  handleReviewRecipe(recipe.recipe.id, EReviewStatus.REJECT);
                close();
              }}
            >
              Từ Chối
            </Button>
            <Button
              color="green"
              onClick={() => {
                if (recipe?.recipe?.id)
                  handleReviewRecipe(recipe.recipe.id, EReviewStatus.APPROVE);
                close();
              }}
            >
              Chấp Nhận
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative h-full">
          <div className="w-full h-[750px] overflow-auto pb-[56px]">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-2xl">{mealPlan?.title}</h2>
              <div className="flex gap-2 items-center">
                <Avatar src={mealPlan?.author?.picture} />
                <div className="flex flex-col font-semibold">
                  <span className="text-gray-400">Tác giả:</span>
                  <span>{mealPlan?.author?.fullName}</span>
                </div>
              </div>
            </div>
            <div className="font-semibold my-2">
              <span>cập nhật lần cuối lúc: </span>
              <span className="text-[#9aa2b1]">
                {dayjs(mealPlan?.updatedAt).format('MMM DD, YYYY')}
              </span>
            </div>
            <div className="mx-2">
              <BlockNoteViewOnly content={mealPlan?.content || ''} />
            </div>

            {mealPlan?.frequency === EMealPlanFrequency.DAILY ? (
              <div>
                <RecipeBlock mealPlanRecipes={mealPlan.mealPlanRecipe} />
              </div>
            ) : (
              mealPerDay.map((mealPlanRecipes, index) => (
                <div className="mt-5" key={index}>
                  <Box mx="auto">
                    <Group mb={5}>
                      <div
                        className="flex w-full cursor-pointer justify-between border-b-[1px]"
                        onClick={() => {
                          setOpenedMealPlan((prev) => {
                            prev[index] = !prev[index];

                            console.log(prev);

                            return [...prev];
                          });
                        }}
                      >
                        <span className="ml-2 text-xl font-bold">
                          Ngày {index + 1}
                        </span>
                        {openedMealPlan[index] ? (
                          <IconChevronUp className="mr-2 h-5 w-5" />
                        ) : (
                          <IconChevronDown className="mr-2 h-5 w-5" />
                        )}
                      </div>
                    </Group>

                    <Collapse in={openedMealPlan[index]}>
                      <RecipeBlock
                        mealPlanRecipes={mealPlanRecipes}
                        key={index}
                      />
                    </Collapse>
                  </Box>
                </div>
              ))
            )}
          </div>

          <div className="absolute bottom-0 flex justify-center gap-20 w-full bg-white h-[52px] items-end">
            <Button
              color="red"
              onClick={() => {
                if (mealPlan?.id)
                  handleReviewMealPlan(mealPlan.id, EReviewStatus.REJECT);
                close();
              }}
            >
              Từ Chối
            </Button>
            <Button
              color="green"
              onClick={() => {
                if (mealPlan?.id)
                  handleReviewMealPlan(mealPlan.id, EReviewStatus.APPROVE);
                close();
              }}
            >
              Chấp Nhận
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
