import { EReviewStatus } from '../../../enums/review-recipe-status.enum';

export type TReviewUserRequest = {
  id: number;
  status: EReviewStatus;
  notificationId: number;
};
