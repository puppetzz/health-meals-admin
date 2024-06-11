'use client';

import {
  Anchor,
  Box,
  Breadcrumbs,
  Collapse,
  Group,
  Rating,
} from '@mantine/core';
import { useMealPlanByIdQuery } from '../../../queries';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { RecipeBlock } from '../../../components/meal-plan/RecipeBlock';
import { useDisclosure } from '@mantine/hooks';
import { EMealPlanFrequency } from '../../../common/enums/MealPlanFrequency';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useMealPlanCommentQuery } from '../../../queries';
import { MealPlanCommentView } from '../../../components/comment/MealPlanComment';
import { TMealPlanComment } from '../../../common/types/MealPlanComment';
import { CommentForm } from '../../../components/forms/CommentForm';
import { TCommentInputField } from '../../../common/types/form/CommentInputField';
import { useMealPlanCommentMutation } from '../../../mutation';
import { numberWithCommas } from '../../../utils/numberCommasFormat';
import { IconChevronDown, IconChevronUp, IconHome } from '@tabler/icons-react';

const BlockNoteViewOnly = dynamic(
  () =>
    import('../../../components/blog/BlockNoteViewOnly').then(
      (mod) => mod.default
    ),
  {
    ssr: false,
  }
);

export default function MealPlanDetail({ params }: { params: { id: number } }) {
  const [isReplyComment, setIsReplyComment] = useState(false);
  const [opened, { toggle }] = useDisclosure(true);
  const [openedMealPlan, setOpenedMealPlan] = useState<boolean[]>(
    [...Array(7)].map(() => true)
  );

  const { data: mealPlan } = useMealPlanByIdQuery(Number(params.id));

  const { data: comment } = useMealPlanCommentQuery(Number(params.id));

  const mealPlanComment = useMealPlanCommentMutation();

  const mealPerDay = useMemo(() => {
    if (!mealPlan?.data.mealPlanRecipe) return [];

    const result = [];

    for (const mealPlanRecipe of mealPlan?.data.mealPlanRecipe) {
      if (!result[mealPlanRecipe.day - 1]) {
        result[mealPlanRecipe.day - 1] = [mealPlanRecipe];
      } else {
        result[mealPlanRecipe.day - 1].push(mealPlanRecipe);
      }
    }

    return result;
  }, [mealPlan?.data.mealPlanRecipe]);

  const details = useMemo(() => {
    if (!mealPlan?.data.mealPlanRecipe) return null;

    return mealPlan?.data.mealPlanRecipe.reduce(
      (acc, curr) => {
        acc.calories += curr.recipe.nutrition.calories;
        acc.protein += curr.recipe.nutrition.protein;
        acc.fat += curr.recipe.nutrition.fat;
        acc.carbs += curr.recipe.nutrition.carbohydrates;
        return acc;
      },
      {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
      }
    );
  }, [mealPlan?.data.mealPlanRecipe]);

  const handleSubmitComment = (values: TCommentInputField) => {
    const rating = values.isReview ? values.rating : undefined;

    mealPlanComment.mutate({
      mealPlanId: mealPlan?.data.id as number,
      content: values.content,
      rating,
    });
  };

  return (
    <div className="mx-auto flex max-w-[1200px] px-6 pt-5">
      <div className="mr-7 flex-1">
        <div>
          <Breadcrumbs>
            <Anchor href="/meal-plans" className="text-gray-500">
              Meal Plan
            </Anchor>
            <span className="cursor-pointer">{mealPlan?.data.title}</span>
          </Breadcrumbs>
        </div>
        <div className="mt-5">
          <h1 className="text-4xl font-bold">{mealPlan?.data.title}</h1>
        </div>
        <div className="mt-3 flex justify-between">
          <div>
            {!!mealPlan?.data.publishedAt ? (
              <div className="text-sm font-semibold">
                <span className="mr-1">Published On:</span>
                <span className="text-[#9aa2b1]">
                  {dayjs(mealPlan?.data.publishedAt).format('MMM DD, YYYY')}
                </span>
              </div>
            ) : (
              <div className="text-sm font-semibold">
                <span>Private Meal Plan</span>
              </div>
            )}
            <div className="text-sm font-semibold">
              <span className="mr-1">Last Update On:</span>
              <span className="text-[#9aa2b1]">
                {dayjs(mealPlan?.data.updatedAt).format('MMM DD, YYYY')}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-fit w-fit">
              <img
                src={mealPlan?.data.author.picture}
                alt=""
                className="h-12 w-12 rounded-full  object-cover"
              />
            </div>
            <div className="flex flex-col font-semibold ">
              <span className="italic text-[#9aa2b1]">Author:</span>
              <span className="">{mealPlan?.data.author.fullName}</span>
            </div>
          </div>
        </div>
        <div>
          <BlockNoteViewOnly content={mealPlan?.data.content as string} />
        </div>

        {mealPlan?.data.frequency === EMealPlanFrequency.DAILY ? (
          <div>
            <RecipeBlock mealPlanRecipes={mealPlan.data.mealPlanRecipe} />
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
                  <RecipeBlock mealPlanRecipes={mealPlanRecipes} key={index} />
                </Collapse>
              </Box>
            </div>
          ))
        )}

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">Reviews</span>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold">
                {mealPlan?.data.rating}
              </span>
              <div className="flex flex-col">
                <Rating value={mealPlan?.data.rating || 0} readOnly size="md" />
                <span>{`(Dựa trên ${mealPlan?.data.numberOfReviews} đánh giá)`}</span>
              </div>
            </div>
          </div>
          {!isReplyComment && <CommentForm onSubmit={handleSubmitComment} />}
          <div className="mt-10">
            <MealPlanCommentView
              comments={comment?.data as TMealPlanComment[]}
              setIsReplyComment={setIsReplyComment}
            />
          </div>
        </div>
      </div>

      <div className="w-[300px]">
        <div className="h-fit w-full rounded-xl bg-white p-4 font-semibold">
          <div className="flex gap-2 text-gray-400">
            <Rating readOnly size="md" value={mealPlan?.data.rating || 0} />
            <span>{mealPlan?.data.rating || 0}</span>
            <span>{`(${mealPlan?.data.numberOfReviews || 0} reviews)`}</span>
          </div>
          <div className="flex flex-col">
            <div className="mb-3 mt-5">
              <span className="font-bold">Details</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-[#9aa2b1]">Tổng Lương Calo:</span>
                <span className="flex items-center gap-2">
                  <Image
                    src="/svg/fire.svg"
                    alt="Fire"
                    width={12}
                    height={12}
                  />
                  <span>{`${numberWithCommas(
                    details?.calories || 0
                  )}Cal`}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9aa2b1]">Tổng Lương Protein:</span>
                <span>{`${numberWithCommas(details?.protein || 0)}g`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9aa2b1]">Tổng Lương Carbs:</span>
                <span>{`${numberWithCommas(details?.carbs || 0)}g`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9aa2b1]">Tổng Lương Fat:</span>
                <span>{`${numberWithCommas(details?.fat || 0)}g`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
