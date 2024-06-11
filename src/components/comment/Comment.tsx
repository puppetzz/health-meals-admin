'use client';

import { TComment } from '../../common/types/comment';
import { CommentBlock } from './CommentBlock';

type CommentProps = {
  comments: TComment[];
  setIsReplyComment: (value: boolean) => void;
};

export function CommentView({ comments, setIsReplyComment }: CommentProps) {
  return (
    <div>
      {comments?.map((comment) => {
        return (
          <div key={comment.id}>
            <CommentBlock
              comment={comment}
              setIsReplyComment={setIsReplyComment}
            />
            <div className="ml-5">
              {comment?.comment?.map((reply) => (
                <div key={reply.id}>
                  <CommentBlock comment={reply} allowReply={false} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
