'use client';

import { useQuery } from '@tanstack/react-query';
import { TGetUserRequest } from '../common/types/request/users/GetUser';
import { QueryKey } from '../common/constants';
import { getUsers } from '../api/users';

export const useUserQuery = (query: TGetUserRequest) => {
  return useQuery({
    queryKey: [QueryKey.GET_USER, query],
    queryFn: async () => {
      const usersResponse = await getUsers(query);

      return usersResponse;
    },
  });
};
