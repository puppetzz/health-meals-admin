import { API } from '../common/constants';
import { TResponse } from '../common/types';
import { TNotifications } from '../common/types/response/Notifications';
import axiosClient from '../lib/axiosClient';

export const getNotification = async () => {
  const response = await axiosClient.get<TResponse<TNotifications[]>>(
    API.NOTIFICATIONS
  );

  return response.data;
};
