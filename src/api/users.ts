import { API } from '../common/constants/api';
import { TResponse, TUserPaginationResponse } from '../common/types';
import { TGetUserRequest } from '../common/types/request/users/GetUser';
import axiosClient from '../lib/axiosClient';

export const getUsers = async (
  query: TGetUserRequest
): Promise<TResponse<TUserPaginationResponse>> => {
  const response = await axiosClient<TResponse<TUserPaginationResponse>>({
    url: API.USERS,
    method: 'GET',
    params: query,
  });

  return response.data;
};
