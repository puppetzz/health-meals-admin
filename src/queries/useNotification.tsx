'use client';

import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../common/constants';
import { getNotification } from '../api/notification';

export const useNotificationsQuery = () => {
  return useQuery({
    queryKey: [QueryKey.GET_NOTIFICATIONS],
    queryFn: async () => {
      return await getNotification();
    },
  });
};
