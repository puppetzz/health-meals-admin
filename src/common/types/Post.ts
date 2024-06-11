import { EPostStatus } from '../enums/PostStatus';
import { TRecipe } from './Recipes';
import { TUser } from './User';

export type TPost = {
  id: number;
  authorId: number;
  parentId: number;
  title: string;
  content: string;
  rating: number;
  numberOfComments?: number;
  numberOfReviews?: number;
  published: boolean;
  createAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  status: EPostStatus;
  recipe?: TRecipe;
  thumbnail: string;
  author?: TUser;
};
