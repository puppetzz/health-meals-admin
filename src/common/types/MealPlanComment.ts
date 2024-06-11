import { TUser } from './User';

export type TMealPlanComment = {
  id: number;
  mealPlanId: number;
  parentId: number;
  authorId: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  author: TUser;
  comment?: TMealPlanComment[];
};
