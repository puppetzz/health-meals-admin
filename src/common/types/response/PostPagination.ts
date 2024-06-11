import { TPost } from '../Post';

export type TPostPaginationResponse = {
  data: TPost[];
  page: number;
  total: number;
};
