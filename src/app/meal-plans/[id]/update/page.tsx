'use client';

import {
  Box,
  Button,
  Collapse,
  Group,
  Radio,
  Select,
  Stepper,
} from '@mantine/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EMealPlanFrequency } from '../../../../common/enums/MealPlanFrequency';
import { EGoal } from '../../../../common/enums/Goal';
import { ECarbsType } from '../../../../common/enums/CarbsType';
import {
  TDetailCaloriesOfMeals,
  THealthMetricsTarget,
  TNutritionPerMeal,
} from '../../../../common/types/form/HealthMetricsTarget';
import { TMacronutrient } from '../../../../common/types/response/health-metric-tdee';
import { MealMacronutrientBlock } from '../../../../components/meal-plan/MealMacronutrientBlock';
import { MealPlanSelect } from '../../../../components/meal-plan/MealPlanSelect';
import dynamic from 'next/dynamic';
import {
  useHealthMetricsQuery,
  useMealPlanByIdQuery,
} from '../../../../queries';
import { TMealPlanRecipeRequest } from '../../../../common/types/meal-plan/CreateMealPlan';
import { EMealPlanStatus } from '../../../../common/enums/MealPlanStatus';
import Image from 'next/image';
import { numberWithCommas } from '../../../../utils/numberCommasFormat';
import { notifications } from '@mantine/notifications';
import { useMealPlanMutation } from '../../../../mutation';
import { MealPlanPreviewBlock } from '../../../../components/meal-plan/MealPlanPreviewBlock';
import { useRouter } from 'next/navigation';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { TRecipe } from '../../../../common/types/Recipes';
import { useUpdateMealPlanMutation } from '../../../../mutation/useUpdateMealPlan';

const BlockNote = dynamic(
  () =>
    import('../../../../components/blog/BlockNote').then((mod) => mod.default),
  {
    ssr: false,
  }
);

const BlockNoteViewOnly = dynamic(
  () =>
    import('../../../../components/blog/BlockNoteViewOnly').then(
      (mod) => mod.default
    ),
  {
    ssr: false,
  }
);

type GoalType = 'cutting' | 'maintenance' | 'bulking';

export default function UpdateMealPlan({ params }: { params: { id: number } }) {
  const router = useRouter();

  const isInitialDataRef = useRef<boolean>(true);

  const [active, setActive] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [frequency, setFrequency] = useState<string>(EMealPlanFrequency.DAILY);
  const [selectedRecipes, setSelectedRecipes] = useState<TRecipe[][]>([[]]);
  const [openedMealPlan, setOpenedMealPlan] = useState<boolean[]>(
    [...Array(7)].map(() => true)
  );

  const [numberOfMeals, setNumberOfMeals] = useState<string>('3');
  const [goal, setGoal] = useState<string>(EGoal.MAINTENANCE);
  const [carbsType, setCarbsType] = useState<string>(ECarbsType.MODERATE_CARBS);
  const [totalMacronutrient, setTotalMacronutrient] =
    useState<TNutritionPerMeal>({
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
    });

  const [mealPlanRecipes, setMealPlanRecipes] = useState<
    TMealPlanRecipeRequest[][]
  >([[]]);

  const { data: healthMetrics } = useHealthMetricsQuery();
  const { data: mealPlan } = useMealPlanByIdQuery(Number(params.id));

  const updateMealPlanMutation = useUpdateMealPlanMutation();

  const calDetailMacronutrientPerMeal = useCallback(
    (calories: number, carbsType: ECarbsType) => {
      let macronutrient = {
        calories: calories,
        protein: 0,
        fat: 0,
        carbs: 0,
      };

      let proportion = {
        protein: 0.3,
        fat: 0.35,
        carbs: 0.35,
      };

      switch (carbsType) {
        case ECarbsType.LOWER_CARBS:
          proportion = {
            protein: 0.3,
            fat: 0.35,
            carbs: 0.35,
          };
          break;
        case ECarbsType.MODERATE_CARBS:
          proportion = {
            protein: 0.4,
            fat: 0.4,
            carbs: 0.2,
          };
          break;
        case ECarbsType.HIGHER_CARBS:
          proportion = {
            protein: 0.3,
            fat: 0.2,
            carbs: 0.5,
          };
          break;
      }

      macronutrient.protein = Math.round((calories * proportion.protein) / 4);
      macronutrient.fat = Math.round((calories * proportion.fat) / 9);
      macronutrient.carbs = Math.round((calories * proportion.carbs) / 4);
      return macronutrient;
    },
    []
  );

  const healthMetricsForGoals: THealthMetricsTarget = useMemo(() => {
    let tdee = healthMetrics?.data.tdee || 0;
    const macronutrient: TMacronutrient = {
      protein:
        healthMetrics?.data.macronutrients.maintenance.moderateCarbs.protein ||
        0,
      fat:
        healthMetrics?.data.macronutrients.maintenance.moderateCarbs.fat || 0,
      carbs:
        healthMetrics?.data.macronutrients.maintenance.moderateCarbs.carbs || 0,
    };

    let detailCaloriesOfMeals: TDetailCaloriesOfMeals = {
      breakfast: calDetailMacronutrientPerMeal(
        healthMetrics?.data.mealCaloriesRecommendation.maintenance
          .threeMealPerDay[0] || 0,
        carbsType as ECarbsType
      ),
      lunch: calDetailMacronutrientPerMeal(
        healthMetrics?.data.mealCaloriesRecommendation.maintenance
          .threeMealPerDay[1] || 0,
        carbsType as ECarbsType
      ),
      dinner: calDetailMacronutrientPerMeal(
        healthMetrics?.data.mealCaloriesRecommendation.maintenance
          .threeMealPerDay[2] || 0,
        carbsType as ECarbsType
      ),
    };

    if (healthMetrics) {
      if (goal === EGoal.CUTTING) {
        tdee = healthMetrics.data.tdee - 500;
      } else if (goal === EGoal.BULKING) {
        tdee = healthMetrics.data.tdee + 500;
      }

      const goalType = goal.toLowerCase() as GoalType;
      let carbsTypeData;

      switch (carbsType) {
        case ECarbsType.MODERATE_CARBS:
          carbsTypeData =
            healthMetrics.data.macronutrients[goalType].moderateCarbs;
          break;
        case ECarbsType.LOWER_CARBS:
          carbsTypeData =
            healthMetrics.data.macronutrients[goalType].lowerCarbs;
          break;
        case ECarbsType.HIGHER_CARBS:
          carbsTypeData =
            healthMetrics.data.macronutrients[goalType].higherCarbs;
          break;
        default:
          carbsTypeData = { carbs: 0, protein: 0, fat: 0 };
          break;
      }

      macronutrient.carbs = carbsTypeData.carbs || 0;
      macronutrient.protein = carbsTypeData.protein || 0;
      macronutrient.fat = carbsTypeData.fat || 0;

      switch (numberOfMeals) {
        case '3':
          detailCaloriesOfMeals.breakfast = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .threeMealPerDay[0] || 0,
            carbsType as ECarbsType
          );
          detailCaloriesOfMeals.lunch = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .threeMealPerDay[1] || 0,
            carbsType as ECarbsType
          );
          detailCaloriesOfMeals.dinner = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .threeMealPerDay[2] || 0,
            carbsType as ECarbsType
          );
          break;
        case '4':
          detailCaloriesOfMeals.breakfast = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .fourMealPerDay[0] || 0,
            carbsType as ECarbsType
          );
          detailCaloriesOfMeals.lunch = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .fourMealPerDay[1] || 0,
            carbsType as ECarbsType
          );
          detailCaloriesOfMeals.dinner = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .fourMealPerDay[2] || 0,
            carbsType as ECarbsType
          );
          detailCaloriesOfMeals.snacks = [
            calDetailMacronutrientPerMeal(
              healthMetrics.data.mealCaloriesRecommendation[goalType]
                .fourMealPerDay[3] || 0,
              carbsType as ECarbsType
            ),
          ];
          break;

        case '5':
          detailCaloriesOfMeals.breakfast = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .fiveMealPerDay[0] || 0,
            carbsType as ECarbsType
          );
          detailCaloriesOfMeals.lunch = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .fiveMealPerDay[1] || 0,
            carbsType as ECarbsType
          );
          detailCaloriesOfMeals.dinner = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .fiveMealPerDay[2] || 0,
            carbsType as ECarbsType
          );
          detailCaloriesOfMeals.snacks = [
            calDetailMacronutrientPerMeal(
              healthMetrics.data.mealCaloriesRecommendation[goalType]
                .fiveMealPerDay[3] || 0,
              carbsType as ECarbsType
            ),
            calDetailMacronutrientPerMeal(
              healthMetrics.data.mealCaloriesRecommendation[goalType]
                .fiveMealPerDay[4] || 0,
              carbsType as ECarbsType
            ),
          ];
          break;
      }
    }

    return {
      tdee,
      macronutrient,
      detailCaloriesOfMeals,
    };
  }, [
    healthMetrics,
    goal,
    carbsType,
    numberOfMeals,
    calDetailMacronutrientPerMeal,
  ]);

  const handleCreateDraft = () => {
    if (!title) {
      notifications.show({
        title: 'Failed to save draft',
        message: 'Content is required',
        color: 'red',
      });
      return;
    }

    const status = EMealPlanStatus.DRAFT;

    const recipes = mealPlanRecipes.flat();

    updateMealPlanMutation
      .mutateAsync({
        id: mealPlan?.data.id as number,
        title,
        content,
        frequency: frequency as EMealPlanFrequency,
        mealPlanRecipes: recipes,
        mealPerDay: Number(numberOfMeals),
      })
      .then(() => {
        router.push('/meal-plans');
        notifications.show({
          title: 'Create Meal Plan',
          color: 'green',
          message: 'Create Successfully!',
        });
      });
  };

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    if (isInitialDataRef.current && mealPlan?.data) {
      setTitle(mealPlan.data.title);
      setContent(mealPlan.data.content);
      setFrequency(mealPlan.data.frequency);

      switch (mealPlan.data.frequency) {
        case EMealPlanFrequency.DAILY: {
          const recipes: TRecipe[] = [];

          const mealPlanRecipes: TMealPlanRecipeRequest[] =
            mealPlan.data.mealPlanRecipe.map((mealPlanRecipe) => {
              recipes.push(mealPlanRecipe.recipe);

              return {
                recipeId: mealPlanRecipe.recipeId,
                day: mealPlanRecipe.day,
                meal: mealPlanRecipe.meal,
              } as TMealPlanRecipeRequest;
            });

          setMealPlanRecipes([mealPlanRecipes]);
          setSelectedRecipes([recipes]);
          break;
        }
        case EMealPlanFrequency.WEEKLY: {
          const recipes: TRecipe[][] = [[]];
          const mealPlanRecipes: TMealPlanRecipeRequest[][] =
            mealPlan.data.mealPlanRecipe.reduce(
              (result, mealPlanRecipe) => {
                const mealPlanRequest: TMealPlanRecipeRequest = {
                  recipeId: mealPlanRecipe.recipeId,
                  day: mealPlanRecipe.day,
                  meal: mealPlanRecipe.meal,
                };

                if (!result[mealPlanRecipe.day - 1]) {
                  result.push([mealPlanRequest]);
                  recipes.push([mealPlanRecipe.recipe]);
                }

                result[mealPlanRecipe.day - 1].push(mealPlanRequest);
                recipes[mealPlanRecipe.day - 1].push(mealPlanRecipe.recipe);

                return result;
              },
              [[]] as TMealPlanRecipeRequest[][]
            );
          setMealPlanRecipes(mealPlanRecipes);
          setSelectedRecipes(recipes);
          break;
        }
        case EMealPlanFrequency.MONTHLY:
      }
    }
  }, [mealPlan?.data]);

  return (
    <>
      <div className="mx-auto mt-5 max-w-[1200px] p-2">
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="Mô tả">
            <div className="mx-auto h-[calc(100vh-240px)] max-w-[1100px] overflow-auto">
              <input
                type="text"
                className="w-full px-[50px] text-5xl font-bold outline-none"
                placeholder="Add Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <BlockNote content={content} setContent={setContent} />
            </div>
          </Stepper.Step>
          <Stepper.Step label="Nhu Cầu">
            <div className="flex">
              <div className="flex-1">
                <div className="m-5 flex flex-col gap-5 rounded-xl border-[1px] p-5 shadow-sm">
                  <div className="flex items-center">
                    <span className="mr-3 font-semibold">Bạn muốn:</span>
                    <Radio.Group value={goal} onChange={setGoal}>
                      <Group>
                        <Radio value={EGoal.CUTTING} label="Giảm Cân" />
                        <Radio
                          value={EGoal.MAINTENANCE}
                          label="Duy Trì Cân Nặng"
                        />
                        <Radio value={EGoal.BULKING} label="Tăng Cân" />
                      </Group>
                    </Radio.Group>
                  </div>
                  <div className="flex h-full items-center">
                    <span className="mr-3 font-semibold">
                      Số lượng bữa ăn mong muốn(trong 1 ngày):
                    </span>
                    <div>
                      <Radio.Group
                        value={numberOfMeals}
                        onChange={(value) => {
                          setNumberOfMeals((prev) => {
                            if (prev === '5') {
                              setSelectedRecipes([[]]);
                              setMealPlanRecipes([[]]);
                              return value;
                            }

                            if (value === '3' && prev === '4') {
                              setSelectedRecipes([[]]);
                              setMealPlanRecipes([[]]);
                              return value;
                            }

                            return value;
                          });
                        }}
                      >
                        <Group>
                          <Radio value="3" label="3 bữa" />
                          <Radio value="4" label="4 bữa" />
                          <Radio value="5" label="5 bữa" />
                        </Group>
                      </Radio.Group>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">Thực Đơn:</span>
                    <Select
                      data={[
                        {
                          value: EMealPlanFrequency.DAILY,
                          label: 'Hằng Ngày',
                        },
                        {
                          value: EMealPlanFrequency.WEEKLY,
                          label: 'Hằng Tuần',
                        },
                      ]}
                      onChange={(value) => {
                        if (value) {
                          setFrequency(value);
                        }
                      }}
                      value={frequency}
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 font-semibold">Lượng Carbs:</span>
                    <Radio.Group value={carbsType} onChange={setCarbsType}>
                      <Group>
                        <Radio value={ECarbsType.LOWER_CARBS} label="Ít" />
                        <Radio
                          value={ECarbsType.MODERATE_CARBS}
                          label="Vừa phải"
                        />
                        <Radio value={ECarbsType.HIGHER_CARBS} label="Nhiều" />
                      </Group>
                    </Radio.Group>
                  </div>
                </div>
                <div className="m-5">
                  <span className="text-xl font-bold">
                    Lượng Calo Cần Thiết Để Đạt Đạt Đến Mục Tiêu Đặt Ra:
                  </span>
                  <div className="mt-3 flex">
                    <div className="flex w-1/2 flex-col gap-2">
                      <MealMacronutrientBlock
                        title="Bữa Sáng"
                        calories={
                          healthMetricsForGoals.detailCaloriesOfMeals.breakfast
                            .calories
                        }
                        protein={
                          healthMetricsForGoals.detailCaloriesOfMeals.breakfast
                            .protein
                        }
                        fat={
                          healthMetricsForGoals.detailCaloriesOfMeals.breakfast
                            .fat
                        }
                        carbs={
                          healthMetricsForGoals.detailCaloriesOfMeals.breakfast
                            .carbs
                        }
                      />
                      <MealMacronutrientBlock
                        title="Bữa Trưa"
                        calories={
                          healthMetricsForGoals.detailCaloriesOfMeals.lunch
                            .calories
                        }
                        protein={
                          healthMetricsForGoals.detailCaloriesOfMeals.lunch
                            .protein
                        }
                        fat={
                          healthMetricsForGoals.detailCaloriesOfMeals.lunch.fat
                        }
                        carbs={
                          healthMetricsForGoals.detailCaloriesOfMeals.lunch
                            .carbs
                        }
                      />
                      <MealMacronutrientBlock
                        title="Bữa Tối"
                        calories={
                          healthMetricsForGoals.detailCaloriesOfMeals.dinner
                            .calories
                        }
                        protein={
                          healthMetricsForGoals.detailCaloriesOfMeals.dinner
                            .protein
                        }
                        fat={
                          healthMetricsForGoals.detailCaloriesOfMeals.dinner.fat
                        }
                        carbs={
                          healthMetricsForGoals.detailCaloriesOfMeals.dinner
                            .carbs
                        }
                      />
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center gap-5">
                      {healthMetricsForGoals.detailCaloriesOfMeals
                        .snacks?.[0] && (
                        <MealMacronutrientBlock
                          title="Bữa Phụ"
                          calories={
                            healthMetricsForGoals.detailCaloriesOfMeals
                              .snacks[0].calories
                          }
                          protein={
                            healthMetricsForGoals.detailCaloriesOfMeals
                              .snacks[0].protein
                          }
                          fat={
                            healthMetricsForGoals.detailCaloriesOfMeals
                              .snacks[0].fat
                          }
                          carbs={
                            healthMetricsForGoals.detailCaloriesOfMeals
                              .snacks[0].carbs
                          }
                        />
                      )}
                      {healthMetricsForGoals.detailCaloriesOfMeals
                        .snacks?.[1] && (
                        <MealMacronutrientBlock
                          title="Bữa Phụ"
                          calories={
                            healthMetricsForGoals.detailCaloriesOfMeals
                              .snacks[1].calories
                          }
                          protein={
                            healthMetricsForGoals.detailCaloriesOfMeals
                              .snacks[1].protein
                          }
                          fat={
                            healthMetricsForGoals.detailCaloriesOfMeals
                              .snacks[1].fat
                          }
                          carbs={
                            healthMetricsForGoals.detailCaloriesOfMeals
                              .snacks[1].carbs
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Stepper.Step>
          <Stepper.Step label="Lên Kế Hoạch">
            <MealPlanSelect
              tdee={healthMetricsForGoals.tdee}
              numberOfMeals={Number(numberOfMeals)}
              setMealPlanRecipes={setMealPlanRecipes}
              healthMetricsForGoals={healthMetricsForGoals}
              selectedRecipes={selectedRecipes}
              setSelectedRecipes={setSelectedRecipes}
              totalMacronutrient={totalMacronutrient}
              setTotalMacronutrient={setTotalMacronutrient}
              frequency={frequency as EMealPlanFrequency}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <div className="flex h-[calc(100vh-240px)] max-w-[1300px] overflow-auto rounded-xl border-[1px] px-3 py-5 shadow-md bg-white">
              <div className="flex-1">
                <div className="mb-3 px-[54px]">
                  <h1 className=" text-5xl font-bold">{title}</h1>
                </div>
                <div>
                  <BlockNoteViewOnly content={content} />
                </div>
                {frequency === EMealPlanFrequency.DAILY ? (
                  <div className="flex flex-col items-center gap-4 px-[52px]">
                    {selectedRecipes[0].map((recipe, index) => {
                      return (
                        <MealPlanPreviewBlock
                          recipe={recipe}
                          meal={index + 1}
                          key={index}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    {selectedRecipes.map((recipePerDay, index) => {
                      return (
                        <Box mx="auto" className="px-[52px]" key={index}>
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
                            <div className="flex flex-col items-center gap-4">
                              {recipePerDay.map((recipe, index) => {
                                return (
                                  <MealPlanPreviewBlock
                                    recipe={recipe}
                                    meal={index + 1}
                                    key={index}
                                  />
                                );
                              })}
                            </div>
                          </Collapse>
                        </Box>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="w-[300px]">
                <div className="h-fit w-full rounded-xl bg-gray-100 p-4 font-semibold">
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
                            totalMacronutrient.calories
                          )}Cal`}</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9aa2b1]">
                          Tổng Lương Protein:
                        </span>
                        <span>{`${totalMacronutrient.protein}g`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9aa2b1]">
                          Tổng Lương Carbs:
                        </span>
                        <span>{`${totalMacronutrient.carbs}g`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9aa2b1]">Tổng Lương Fat:</span>
                        <span>{`${totalMacronutrient.fat}g`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Stepper.Completed>
        </Stepper>
      </div>

      <Group justify="center" mt="sm">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        {active === 3 ? (
          <Button onClick={handleCreateDraft}>Publish</Button>
        ) : (
          <Button onClick={nextStep}>Next step</Button>
        )}
      </Group>
    </>
  );
}
