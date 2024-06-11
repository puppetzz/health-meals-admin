'use client';

import { TMealPlanComment } from '../../common/types/MealPlanComment';
import { MealPlanCommentBlock } from './MealPlanCommnetBlock';

type MealPlanCommentViewProps = {
  comments: TMealPlanComment[];
  setIsReplyComment: (value: boolean) => void;
};

export function MealPlanCommentView({
  comments,
  setIsReplyComment,
}: MealPlanCommentViewProps) {
  return (
    <div>
      {comments?.map((comment) => {
        return (
          <div key={comment.id}>
            <MealPlanCommentBlock
              comment={comment}
              setIsReplyComment={setIsReplyComment}
            />
            <div className="ml-5">
              {comment?.comment?.map((reply) => (
                <div key={reply.id}>
                  <MealPlanCommentBlock comment={reply} allowReply={false} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
