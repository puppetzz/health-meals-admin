import { TResponse } from '@/common/types';
import axiosClient from '@/lib/axiosClient';
import { TUserResponse } from '../common/types/response/User';

export const login = async () => {
  const response = await axiosClient.post<TResponse<TUserResponse>>(
    'auth/login'
  );

  return response.data;
};
