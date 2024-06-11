export type THealthMetricTDEEResponse = {
  height: number;
  weight: number;
  age: number;
  gender: string;
  activityLevel: string;
  bmi: number;
  bmr: number;
  tdee: number;
  mealCaloriesRecommendation: TMealCaloriesRecommendation;
  idealWeight: TIdealWeight;
  anotherTDEE: TAnotherTDEE;
  macronutrients: TMacronutrientsForGoals;
};

export type TMealPerDay = {
  threeMealPerDay: number[];
  fourMealPerDay: number[];
  fiveMealPerDay: number[];
};

export type TMealCaloriesRecommendation = {
  maintenance: TMealPerDay;
  cutting: TMealPerDay;
  bulking: TMealPerDay;
};

export type TIdealWeight = {
  hamwi: number;
  devine: number;
  robinson: number;
  miller: number;
};

export type TAnotherTDEE = {
  basalMetabolicRate?: number;
  sedentary?: number;
  lightExercise?: number;
  moderateExercise?: number;
  heavyExercise?: number;
  athlete?: number;
};

export type TMacronutrientsForGoals = {
  maintenance: TMacronutrientsVariants;
  cutting: TMacronutrientsVariants;
  bulking: TMacronutrientsVariants;
};

export type TMacronutrientsVariants = {
  moderateCarbs: TMacronutrient;
  lowerCarbs: TMacronutrient;
  higherCarbs: TMacronutrient;
};

export type TMacronutrient = {
  protein: number;
  carbs: number;
  fat: number;
};
