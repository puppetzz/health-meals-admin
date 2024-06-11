import { TUser } from '../User';

export type TUserPaginationResponse = {
  users: TUser[];
  page: number;
  total: number;
};
