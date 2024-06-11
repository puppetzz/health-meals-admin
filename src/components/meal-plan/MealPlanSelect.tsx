import { useDisclosure } from '@mantine/hooks';
import {
  THealthMetricsTarget,
  TNutritionPerMeal,
} from '../../common/types/form/HealthMetricsTarget';
import { TMealPlanRecipeRequest } from '../../common/types/meal-plan/CreateMealPlan';
import { numberWithCommas } from '../../utils/numberCommasFormat';
import { useState } from 'react';
import { SearchRecipesModal } from '../modals/SearchRecipesModal';
import { TPost } from '../../common/types/Post';
import { RecipeSelectedBox } from './RecipeSelectedBox';
import { EMealPlanFrequency } from '../../common/enums/MealPlanFrequency';

type MealPlanSelectProps = {
  tdee: number;
  numberOfMeals: number;
  setMealPlanRecipes: React.Dispatch<
    React.SetStateAction<TMealPlanRecipeRequest[][]>
  >;
  healthMetricsForGoals: THealthMetricsTarget;
  selectedRecipes: TPost[][];
  setSelectedRecipes: React.Dispatch<React.SetStateAction<TPost[][]>>;
  totalMacronutrient: TNutritionPerMeal;
  setTotalMacronutrient: React.Dispatch<
    React.SetStateAction<TNutritionPerMeal>
  >;
  frequency: EMealPlanFrequency;
};

export function MealPlanSelect({
  tdee,
  numberOfMeals,
  setMealPlanRecipes,
  selectedRecipes,
  setSelectedRecipes,
  healthMetricsForGoals,
  totalMacronutrient,
  setTotalMacronutrient,
  frequency,
}: MealPlanSelectProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [meal, setMeal] = useState(1);
  const [recipeEditing, setRecipeEditing] = useState<TPost>();

  const handleClickRecipe = (
    mealPlanRecipe: TMealPlanRecipeRequest,
    recipe: TPost,
    day: number,
    meal: number
  ) => {
    setMealPlanRecipes((prev) => {
      if (!prev[day]) {
        prev[day] = [];
      }
      prev[day][meal] = mealPlanRecipe;
      return prev;
    });
    setSelectedRecipes((prev) => {
      if (!prev[day]) {
        prev[day] = [];
      }
      prev[day][meal] = recipe;

      return prev;
    });

    setTotalMacronutrient((prev) => {
      if (recipeEditing) {
        return {
          calories:
            prev.calories - (recipeEditing.recipe?.nutrition.calories || 0),
          protein:
            prev.protein - (recipeEditing.recipe?.nutrition.protein || 0),
          fat: prev.fat - (recipeEditing.recipe?.nutrition.fat || 0),
          carbs:
            prev.carbs - (recipeEditing.recipe?.nutrition.carbohydrates || 0),
        };
      }
      return prev;
    });

    setRecipeEditing(undefined);
  };

  const [currentDay, setCurrentDay] = useState(0);

  return (
    <div className="flex h-[calc(100vh-240px)] overflow-auto">
      <div className="mr-5 flex-1">
        {frequency === EMealPlanFrequency.DAILY ? (
          numberOfMeals < 5 ? (
            <div className="flex flex-col gap-3">
              <RecipeSelectedBox
                recipe={selectedRecipes[0][0]}
                setMeal={setMeal}
                meal={1}
                openSelectedRecipeModal={open}
                title="Bữa Sáng"
                macronutrientPerMeal={
                  healthMetricsForGoals.detailCaloriesOfMeals.breakfast
                }
                setRecipeEditing={setRecipeEditing}
                currentDay={1}
                setCurrentDay={setCurrentDay}
              />
              <RecipeSelectedBox
                recipe={selectedRecipes[0][1]}
                setMeal={setMeal}
                meal={2}
                openSelectedRecipeModal={open}
                title="Bữa Trưa"
                macronutrientPerMeal={
                  healthMetricsForGoals.detailCaloriesOfMeals.lunch
                }
                setRecipeEditing={setRecipeEditing}
                currentDay={1}
                setCurrentDay={setCurrentDay}
              />
              <RecipeSelectedBox
                recipe={selectedRecipes[0][2]}
                setMeal={setMeal}
                meal={3}
                openSelectedRecipeModal={open}
                title="Bữa Tối"
                macronutrientPerMeal={
                  healthMetricsForGoals.detailCaloriesOfMeals.dinner
                }
                setRecipeEditing={setRecipeEditing}
                currentDay={1}
                setCurrentDay={setCurrentDay}
              />
              {numberOfMeals === 4 && (
                <RecipeSelectedBox
                  recipe={selectedRecipes[0][3]}
                  setMeal={setMeal}
                  meal={4}
                  openSelectedRecipeModal={open}
                  title="Bữa Phụ"
                  macronutrientPerMeal={
                    healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[0]
                  }
                  setRecipeEditing={setRecipeEditing}
                  currentDay={1}
                  setCurrentDay={setCurrentDay}
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <RecipeSelectedBox
                recipe={selectedRecipes[0][0]}
                setMeal={setMeal}
                meal={1}
                openSelectedRecipeModal={open}
                title="Bữa Sáng"
                macronutrientPerMeal={
                  healthMetricsForGoals.detailCaloriesOfMeals.breakfast
                }
                setRecipeEditing={setRecipeEditing}
                currentDay={1}
                setCurrentDay={setCurrentDay}
              />
              <RecipeSelectedBox
                recipe={selectedRecipes[0][3]}
                setMeal={setMeal}
                meal={4}
                openSelectedRecipeModal={open}
                title="Bữa Phụ"
                macronutrientPerMeal={
                  healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[0]
                }
                setRecipeEditing={setRecipeEditing}
                currentDay={1}
                setCurrentDay={setCurrentDay}
              />
              <RecipeSelectedBox
                recipe={selectedRecipes[0][1]}
                setMeal={setMeal}
                meal={2}
                openSelectedRecipeModal={open}
                title="Bữa Trưa"
                macronutrientPerMeal={
                  healthMetricsForGoals.detailCaloriesOfMeals.lunch
                }
                setRecipeEditing={setRecipeEditing}
                currentDay={1}
                setCurrentDay={setCurrentDay}
              />
              <RecipeSelectedBox
                recipe={selectedRecipes[0][4]}
                setMeal={setMeal}
                meal={5}
                openSelectedRecipeModal={open}
                title="Bữa Phụ"
                macronutrientPerMeal={
                  healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[1]
                }
                setRecipeEditing={setRecipeEditing}
                currentDay={1}
                setCurrentDay={setCurrentDay}
              />
              <RecipeSelectedBox
                recipe={selectedRecipes[0][2]}
                setMeal={setMeal}
                meal={3}
                openSelectedRecipeModal={open}
                title="Bữa Tối"
                macronutrientPerMeal={
                  healthMetricsForGoals.detailCaloriesOfMeals.dinner
                }
                setRecipeEditing={setRecipeEditing}
                currentDay={1}
                setCurrentDay={setCurrentDay}
              />
            </div>
          )
        ) : (
          <div>
            {[...Array(7)].map((_, index) => (
              <div key={index}>
                <div>
                  <span>Ngày {index + 1}</span>
                </div>
                {numberOfMeals < 5 ? (
                  <div className="flex flex-col gap-3">
                    <RecipeSelectedBox
                      recipe={selectedRecipes[index]?.[0]}
                      setMeal={setMeal}
                      meal={1}
                      openSelectedRecipeModal={open}
                      title="Bữa Sáng"
                      macronutrientPerMeal={
                        healthMetricsForGoals.detailCaloriesOfMeals.breakfast
                      }
                      setRecipeEditing={setRecipeEditing}
                      currentDay={index + 1}
                      setCurrentDay={setCurrentDay}
                    />
                    <RecipeSelectedBox
                      recipe={selectedRecipes[index]?.[1]}
                      setMeal={setMeal}
                      meal={2}
                      openSelectedRecipeModal={open}
                      title="Bữa Trưa"
                      macronutrientPerMeal={
                        healthMetricsForGoals.detailCaloriesOfMeals.lunch
                      }
                      setRecipeEditing={setRecipeEditing}
                      currentDay={index + 1}
                      setCurrentDay={setCurrentDay}
                    />
                    <RecipeSelectedBox
                      recipe={selectedRecipes[index]?.[2]}
                      setMeal={setMeal}
                      meal={3}
                      openSelectedRecipeModal={open}
                      title="Bữa Tối"
                      macronutrientPerMeal={
                        healthMetricsForGoals.detailCaloriesOfMeals.dinner
                      }
                      setRecipeEditing={setRecipeEditing}
                      currentDay={index + 1}
                      setCurrentDay={setCurrentDay}
                    />
                    {numberOfMeals === 4 && (
                      <RecipeSelectedBox
                        recipe={selectedRecipes[index]?.[3]}
                        setMeal={setMeal}
                        meal={4}
                        openSelectedRecipeModal={open}
                        title="Bữa Phụ"
                        macronutrientPerMeal={
                          healthMetricsForGoals.detailCaloriesOfMeals
                            .snacks?.[0]
                        }
                        setRecipeEditing={setRecipeEditing}
                        currentDay={index + 1}
                        setCurrentDay={setCurrentDay}
                      />
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <RecipeSelectedBox
                      recipe={selectedRecipes[index]?.[0]}
                      setMeal={setMeal}
                      meal={1}
                      openSelectedRecipeModal={open}
                      title="Bữa Sáng"
                      macronutrientPerMeal={
                        healthMetricsForGoals.detailCaloriesOfMeals.breakfast
                      }
                      setRecipeEditing={setRecipeEditing}
                      currentDay={index + 1}
                      setCurrentDay={setCurrentDay}
                    />
                    <RecipeSelectedBox
                      recipe={selectedRecipes[index]?.[3]}
                      setMeal={setMeal}
                      meal={4}
                      openSelectedRecipeModal={open}
                      title="Bữa Phụ"
                      macronutrientPerMeal={
                        healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[0]
                      }
                      setRecipeEditing={setRecipeEditing}
                      currentDay={index + 1}
                      setCurrentDay={setCurrentDay}
                    />
                    <RecipeSelectedBox
                      recipe={selectedRecipes[index]?.[1]}
                      setMeal={setMeal}
                      meal={2}
                      openSelectedRecipeModal={open}
                      title="Bữa Trưa"
                      macronutrientPerMeal={
                        healthMetricsForGoals.detailCaloriesOfMeals.lunch
                      }
                      setRecipeEditing={setRecipeEditing}
                      currentDay={index + 1}
                      setCurrentDay={setCurrentDay}
                    />
                    <RecipeSelectedBox
                      recipe={selectedRecipes[index]?.[4]}
                      setMeal={setMeal}
                      meal={5}
                      openSelectedRecipeModal={open}
                      title="Bữa Phụ"
                      macronutrientPerMeal={
                        healthMetricsForGoals.detailCaloriesOfMeals.snacks?.[1]
                      }
                      setRecipeEditing={setRecipeEditing}
                      currentDay={index + 1}
                      setCurrentDay={setCurrentDay}
                    />
                    <RecipeSelectedBox
                      recipe={selectedRecipes[index]?.[2]}
                      setMeal={setMeal}
                      meal={3}
                      openSelectedRecipeModal={open}
                      title="Bữa Tối"
                      macronutrientPerMeal={
                        healthMetricsForGoals.detailCaloriesOfMeals.dinner
                      }
                      setRecipeEditing={setRecipeEditing}
                      currentDay={index + 1}
                      setCurrentDay={setCurrentDay}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <SearchRecipesModal
        opened={opened}
        close={close}
        onClickRecipe={handleClickRecipe}
        meal={meal}
        setTotalMacronutrient={setTotalMacronutrient}
        currentDay={currentDay}
      />
      <div className="mt-10 h-[500px] w-[300px] rounded-xl bg-[#f9fafb]">
        <div className="p-3">
          <div className="mb-2">
            <span className="font-bold">Bạn cần</span>
          </div>
          <div className="mb-3 flex rounded-xl bg-[#ed8537] p-4 text-white">
            <div className="flex w-1/2 flex-col items-center border-r-[0.5px]">
              <span className="text-3xl font-bold">
                {numberWithCommas(tdee)}
              </span>
              <span className="text-xs font-semibold text-[#f7c7b3]">
                Calo Mỗi Ngày
              </span>
            </div>
            <div className="flex w-1/2 flex-col  items-center border-l-[0.5px]">
              <span className="text-3xl font-bold">
                {numberWithCommas(tdee * 7)}
              </span>
              <span className="text-xs font-semibold text-[#f7c7b3]">
                Calo Mỗi Tuần
              </span>
            </div>
          </div>

          <div>
            <div>
              <span className="font-bold">Kế Hoạch Của Bạn</span>
            </div>
            <div className="flex h-[370px] flex-col items-center justify-between rounded-xl bg-[#ed8537] p-4 text-white">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{`${numberWithCommas(
                  totalMacronutrient.calories
                )}cal`}</span>
                <span className="font-semibold text-[#f7c7b3]">calories</span>
              </div>
              <div className="h-[1px] w-[70%] bg-white" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{`${numberWithCommas(
                  totalMacronutrient.protein
                )}g`}</span>
                <span className="font-semibold text-[#f7c7b3]">protein</span>
              </div>
              <div className="h-[1px] w-[70%] bg-white" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{`${numberWithCommas(
                  totalMacronutrient.fat
                )}g`}</span>
                <span className="font-semibold text-[#f7c7b3]">fat</span>
              </div>
              <div className="h-[1px] w-[70%] bg-white" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{`${numberWithCommas(
                  totalMacronutrient.carbs
                )}g`}</span>
                <span className="font-semibold text-[#f7c7b3]">carbs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
