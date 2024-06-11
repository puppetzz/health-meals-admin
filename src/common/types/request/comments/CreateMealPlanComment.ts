export type TCreateMealPlanCommentRequest = {
  mealPlanId: number;
  parentId?: number;
  content: string;
  rating?: number;
};
