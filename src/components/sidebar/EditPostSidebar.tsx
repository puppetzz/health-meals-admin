'use client';

import {
  Box,
  Button,
  Checkbox,
  Collapse,
  NumberInput,
  Tabs,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TPostCategory } from '../../common/types/PostCategory';
import { TFoodCategory } from '../../common/types/FoodCategory';
import { ENutritionUnit } from '../../common/enums/NutritionUnit';
import { TNutritionInputFields } from '../../common/types/form/NutritionInputField';
import { TRecipeOptionInputField } from '../../common/types/form/RecipeOptionInputField';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

type EditPostSidebarProps = {
  postCategories: TPostCategory[];
  foodCategories: TFoodCategory[];
  setIsRecipe: (isRecipe: boolean) => void;
  isRecipe: boolean;
  nutrition: TNutritionInputFields;
  setNutrition: (nutrition: TNutritionInputFields) => void;
  recipeOptions: TRecipeOptionInputField;
  setRecipeOptions: (recipeOptions: TRecipeOptionInputField) => void;
  foodCategoriesSelected: string[];
  setFoodCategoriesSelected: (categories: string[]) => void;
  postCategoriesSelected: string[];
  setPostCategoriesSelected: (categories: string[]) => void;
  handleUpdate: () => void;
};

export function EditPostSidebar({
  postCategories,
  foodCategories,
  setIsRecipe,
  isRecipe,
  nutrition,
  setNutrition,
  recipeOptions,
  setRecipeOptions,
  foodCategoriesSelected,
  setFoodCategoriesSelected,
  postCategoriesSelected,
  setPostCategoriesSelected,
  handleUpdate,
}: EditPostSidebarProps) {
  const [foodCategoriesOpened, { toggle: toggleFoodCategories }] =
    useDisclosure(true);
  const [recipeOptionOpened, { toggle: toggleRecipeOption }] =
    useDisclosure(true);
  const [nutritionOpened, { toggle: toggleNutrition }] = useDisclosure(true);

  return (
    <div className="h-[calc(100vh-57px)] min-w-[300px] border-l-[1px]">
      <Tabs defaultValue="categories" color="orange" className="pt-1">
        <Tabs.List>
          <Tabs.Tab value="categories">Thể Loại</Tabs.Tab>
          {isRecipe && <Tabs.Tab value="recipe">Công Thức</Tabs.Tab>}
        </Tabs.List>

        <div className="h-[calc(100vh-150px)] overflow-y-auto">
          <Tabs.Panel value="categories">
            <div className="mb-1">
              <Box maw={400} mx="auto">
                <div
                  className="flex h-11 w-full items-center justify-between px-3 hover:bg-gray-100"
                  onClick={toggleFoodCategories}
                >
                  <span>Thể Loại</span>
                  {foodCategoriesOpened ? (
                    <IconChevronUp className="h-5 w-5" />
                  ) : (
                    <IconChevronDown className="h-5 w-5" />
                  )}
                </div>

                <Collapse in={foodCategoriesOpened}>
                  <div className="mx-3 mt-1">
                    <Checkbox.Group
                      value={foodCategoriesSelected}
                      onChange={setFoodCategoriesSelected}
                    >
                      <div className="flex flex-col gap-1">
                        {foodCategories?.map((category) => (
                          <Checkbox
                            key={category.id}
                            value={category.id.toString()}
                            label={category.name}
                            color="orange"
                          />
                        ))}
                      </div>
                    </Checkbox.Group>
                  </div>
                </Collapse>
              </Box>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="recipe">
            <div className="mt-1">
              <Box maw={400} mx="auto">
                <div
                  className="flex h-11 w-full items-center justify-between px-3 hover:bg-gray-100"
                  onClick={toggleRecipeOption}
                >
                  <span className="font-bold">Tuỳ Chọn</span>
                  {recipeOptionOpened ? (
                    <IconChevronUp className="h-5 w-5" />
                  ) : (
                    <IconChevronDown className="h-5 w-5" />
                  )}
                </div>

                <Collapse in={recipeOptionOpened}>
                  <div className="mt-1 flex w-full flex-col gap-1 px-2">
                    <NumberInput
                      withAsterisk
                      label="Thời gian chuẩn bị"
                      value={recipeOptions.prepTime}
                      onChange={(value) =>
                        setRecipeOptions({
                          ...recipeOptions,
                          prepTime: Number(value),
                        })
                      }
                    />
                    <NumberInput
                      withAsterisk
                      label="Thời gian nấu"
                      value={recipeOptions.cookTime}
                      onChange={(value) =>
                        setRecipeOptions({
                          ...recipeOptions,
                          cookTime: Number(value),
                        })
                      }
                    />
                    <div className="flex w-full justify-between">
                      <NumberInput
                        withAsterisk
                        label="Khẩu phần"
                        className="w-[130px]"
                        value={recipeOptions.servings}
                        onChange={(value) =>
                          setRecipeOptions({
                            ...recipeOptions,
                            servings: Number(value),
                          })
                        }
                      />
                      <TextInput
                        withAsterisk
                        label="Đơn vị đo"
                        className="w-[130px]"
                        value={recipeOptions.unit}
                        onChange={(event) =>
                          setRecipeOptions({
                            ...recipeOptions,
                            unit: event.currentTarget.value,
                          })
                        }
                      />
                    </div>
                    <NumberInput
                      withAsterisk
                      label="Một khẩu phần(g)"
                      value={recipeOptions.servingSize}
                      onChange={(value) =>
                        setRecipeOptions({
                          ...recipeOptions,
                          servingSize: Number(value),
                        })
                      }
                    />
                    <TextInput
                      withAsterisk
                      label="Thời gian có thể để lại"
                      className=""
                      value={recipeOptions.keeping}
                      onChange={(event) =>
                        setRecipeOptions({
                          ...recipeOptions,
                          keeping: event.currentTarget.value,
                        })
                      }
                    />
                  </div>
                </Collapse>
              </Box>
            </div>
            <div>
              <Box maw={400} mx="auto">
                <div
                  className="flex h-11 w-full items-center justify-between px-3 hover:bg-gray-100"
                  onClick={toggleNutrition}
                >
                  <span className="font-bold">Dinh Dưỡng</span>
                  {nutritionOpened ? (
                    <IconChevronUp className="h-5 w-5" />
                  ) : (
                    <IconChevronDown className="h-5 w-5" />
                  )}
                </div>

                <Collapse in={nutritionOpened}>
                  <div className="mb-10 mt-1 flex w-full flex-col gap-1 px-2">
                    <NumberInput
                      withAsterisk
                      label={`Calo (${ENutritionUnit.CALORIES})`}
                      placeholder="Calories"
                      value={nutrition.calories}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, calories: Number(value) })
                      }
                    />
                    <NumberInput
                      withAsterisk
                      label={`Đạm (${ENutritionUnit.PROTEIN})`}
                      placeholder="Protein"
                      value={nutrition.protein}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, protein: Number(value) })
                      }
                    />
                    <NumberInput
                      withAsterisk
                      label={`Cabs (${ENutritionUnit.CARBOHYDRATES})`}
                      placeholder="Cabs"
                      value={nutrition.carbohydrates}
                      onChange={(value) =>
                        setNutrition({
                          ...nutrition,
                          carbohydrates: Number(value),
                        })
                      }
                    />
                    <NumberInput
                      withAsterisk
                      label={`Chất béo (${ENutritionUnit.FAT})`}
                      placeholder="Fat"
                      value={nutrition.fat}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, fat: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Chất béo bão hoà (${ENutritionUnit.SATURATED_FAT})`}
                      placeholder="Saturated Fat"
                      value={nutrition.saturatedFat}
                      onChange={(value) =>
                        setNutrition({
                          ...nutrition,
                          saturatedFat: Number(value),
                        })
                      }
                    />
                    <NumberInput
                      label={`Chất béo không bão hòa đa (${ENutritionUnit.POLYUNSATURATED_FAT})`}
                      placeholder="Polyunsaturated Fat"
                      value={nutrition.polyunsaturatedFat}
                      onChange={(value) =>
                        setNutrition({
                          ...nutrition,
                          polyunsaturatedFat: Number(value),
                        })
                      }
                    />
                    <NumberInput
                      label={`Chất béo không bão hòa đơn (${ENutritionUnit.MONOUNSATURATED_FAT})`}
                      placeholder="Monounsaturated Fat"
                      value={nutrition.monounsaturatedFat}
                      onChange={(value) =>
                        setNutrition({
                          ...nutrition,
                          monounsaturatedFat: Number(value),
                        })
                      }
                    />
                    <NumberInput
                      label={`Trans Fat (${ENutritionUnit.TRANS_FAT})`}
                      placeholder="Chất béo Trans"
                      value={nutrition.transFat}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, transFat: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Cholesterol (${ENutritionUnit.CHOLESTEROL})`}
                      placeholder="Cholesterol"
                      value={nutrition.cholesterol}
                      onChange={(value) =>
                        setNutrition({
                          ...nutrition,
                          cholesterol: Number(value),
                        })
                      }
                    />
                    <NumberInput
                      label={`Natri (${ENutritionUnit.SODIUM})`}
                      placeholder="Sodium"
                      value={nutrition.sodium}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, sodium: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Kali (${ENutritionUnit.POTASSIUM})`}
                      placeholder="Potassium"
                      value={nutrition.potassium}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, potassium: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Chất xơ (${ENutritionUnit.FIBER})`}
                      placeholder="Fiber"
                      value={nutrition.fiber}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, fiber: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Đường (${ENutritionUnit.SUGAR})`}
                      placeholder="Sugar"
                      value={nutrition.sugar}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, sugar: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Vitamin A (${ENutritionUnit.VITAMIN_A})`}
                      placeholder="Vitamin A"
                      value={nutrition.vitaminA}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, vitaminA: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Vitamin C (${ENutritionUnit.VITAMIN_C})`}
                      placeholder="Vitamin C"
                      value={nutrition.vitaminC}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, vitaminC: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Canxi (${ENutritionUnit.CALCIUM})`}
                      placeholder="Calcium"
                      value={nutrition.calcium}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, calcium: Number(value) })
                      }
                    />
                    <NumberInput
                      label={`Sắt (${ENutritionUnit.IRON})`}
                      placeholder="Iron"
                      value={nutrition.iron}
                      onChange={(value) =>
                        setNutrition({ ...nutrition, iron: Number(value) })
                      }
                    />
                  </div>
                </Collapse>
              </Box>
            </div>
          </Tabs.Panel>
        </div>
      </Tabs>
      <div className="flex justify-center gap-3 pt-1 px-3">
        <Button
          variant="filled"
          color="orange"
          className="w-full"
          onClick={() => handleUpdate()}
        >
          Cập Nhật
        </Button>
      </div>
    </div>
  );
}
