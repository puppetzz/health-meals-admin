'use client';

import { Button, Checkbox, Rating, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { TCommentInputField } from '../../common/types/form/CommentInputField';

type CommentFormProps = {
  onSubmit: (values: TCommentInputField) => void;
};

export function CommentForm({ onSubmit: handleSubmit }: CommentFormProps) {
  const [isCommentRating, setIsCommentRating] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      content: '',
      isReview: false,
      rating: 0,
    },
  });

  return (
    <div className="rounded-xl bg-[#f9fafb] p-4">
      <span className="text-lg font-semibold">Leaving a comment</span>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="mt-4">
          <Textarea
            resize="vertical"
            label="Your comment"
            placeholder="Share your thoughts on the recipe here! Rate below if you've made it"
            minRows={3}
            required
            key={form.key('content')}
            {...form.getInputProps('content')}
          />
        </div>
        <Checkbox
          className="mt-2"
          label="I have made this recipe"
          color="orange"
          onChange={(event) => {
            setIsCommentRating(event.target.checked);
            form.setValues({ isReview: event.target.checked });
          }}
          key={form.key('isReview')}
          checked={form.getValues().isReview}
        />

        <div className="mt-2 flex items-center">
          <span
            className={`mr-3 text-gray-600 ${
              !isCommentRating ? 'text-gray-300' : ''
            }`}
          >
            Rate the recipe:{' '}
          </span>
          <Rating
            size="lg"
            readOnly={!isCommentRating}
            onChange={(value) => {
              form.setValues({ rating: value });
            }}
          />
        </div>

        <div className="flex justify-end">
          <Button color="orange" type="submit">
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
}
