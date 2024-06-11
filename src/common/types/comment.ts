import { TUser } from './User';

export type TComment = {
  id: number;
  postId: number;
  parentId: number | null;
  authorId: string;
  content: string;
  rating: number | null;
  createdAt: Date;
  updatedAt: Date;
  author: TUser;
  comment?: TComment[];
};
