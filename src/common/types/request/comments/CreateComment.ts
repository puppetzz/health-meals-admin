export type TCreateCommentRequest = {
  postId: number;
  parentId?: number;
  content: string;
  rating?: number;
};
