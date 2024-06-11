'use client';

import { Rating } from '@mantine/core';
import { TComment } from '../../common/types/comment';
import dayjs from 'dayjs';
import Image from 'next/image';
import { CommentForm } from '../forms/CommentForm';
import { useState } from 'react';
import { TMealPlanComment } from '../../common/types/MealPlanComment';
import { useMealPlanCommentMutation } from '../../mutation/useMealPlanComment';

type MealPlanCommentBlockProps = {
  comment: TMealPlanComment;
  setIsReplyComment?: (value: boolean) => void;
  allowReply?: boolean;
};

export function MealPlanCommentBlock({
  comment,
  setIsReplyComment,
  allowReply = true,
}: MealPlanCommentBlockProps) {
  const [isReply, setIsReply] = useState<boolean>(false);

  const mealPlanCommentMutation = useMealPlanCommentMutation();

  return (
    <div key={comment.id} className="mb-5 border-b-[1px] border-gray-300">
      <div className="flex items-center gap-2">
        <img
          src={comment.author.picture}
          alt=""
          className="h-8 w-8 rounded-full"
        />
        <span className="text-lg font-semibold">{comment.author.fullName}</span>
      </div>
      <div className="mt-2 flex justify-between">
        <div className="w-28">
          {!!comment.rating && <Rating readOnly value={comment.rating} />}
        </div>
        <span className="font-semibold text-gray-400">
          {dayjs(comment.createdAt).format('MMM DD, YYYY')}
        </span>
      </div>
      <p className={`mt-4 ${!allowReply ? 'mb-3' : ''}`}>{comment.content}</p>
      {allowReply && (
        <div className="ml-5 flex gap-2 pb-4 pt-2">
          <Image src="/svg/reply.svg" alt="reply" height={17} width={17} />
          <span
            className="cursor-pointer text-sm font-semibold text-[#667085] underline"
            onClick={() => {
              setIsReply(true);
              setIsReplyComment && setIsReplyComment(true);
            }}
          >
            Reply
          </span>
        </div>
      )}

      {isReply && (
        <div>
          <div className="mb-5">
            <span className="text-xl font-semibold">{`Replay to ${comment.author.fullName}`}</span>
            <span
              className="ml-10 cursor-pointer font-semibold text-[#667085] underline"
              onClick={() => {
                setIsReply(false);
                setIsReplyComment && setIsReplyComment(false);
              }}
            >
              Cancel Reply
            </span>
          </div>

          <CommentForm
            onSubmit={(values) => {
              mealPlanCommentMutation.mutate({
                mealPlanId: comment.mealPlanId,
                parentId: comment.id,
                content: values.content,
              });
            }}
          />
        </div>
      )}
    </div>
  );
}
