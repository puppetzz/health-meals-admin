import { TRole } from './Role';

export type TUser = {
  id: string;
  fullName: string;
  email: string;
  createdAt: Date;
  picture: string;
  role: TRole;
};
