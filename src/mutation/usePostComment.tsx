'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TCreateCommentRequest } from '../common/types/request/comments/CreateComment';
import { createComment } from '../api/comments';
import { QueryKey } from '../common/constants';

export const usePostCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createCommentRequest: TCreateCommentRequest) => {
      const response = await createComment(createCommentRequest);

      return response;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKey.GET_COMMENTS_BY_POST_ID],
      });
    },
  });
};
