import { ENotificationExternalTable } from '../../enums/NotificationExternalTable';
import { TPost } from '../Post';
import { TUser } from '../User';

export type TNotifications = {
  id: number;
  title: string;
  content: string;
  createAt: Date;
  isSolved: boolean;
  notificationOnPost: TNotificationOnPost[];
  detail: TPostNotificationDetail;
};

export type TNotificationOnPost = {
  id: number;
  post: TPost;
};

export type TPostNotificationDetail = {
  externalId: number;
  externalTable: ENotificationExternalTable;
  author: TUser;
};
