'use client';

import { useQuery } from '@tanstack/react-query';
import { onAuthStateChanged, User } from 'firebase/auth';
import { StatusCodes } from 'http-status-codes';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  auth,
  getCurrentUser,
  signInWithGoogle,
  firebaseSignOut,
} from '@/lib/firebase';

import { notifications } from '@mantine/notifications';

import { login } from '@/api/auth';
import { QueryKey } from '@/common/constants';
import { Login } from '../components/login/Login';
import { ERole } from '../common/enums/role';

type AuthContextType = {
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const {
    data: user,
    isLoading,
    refetch,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: [QueryKey.USER],
    queryFn: async () => {
      const user = await getCurrentUser();

      if (!user) {
        return null;
      }

      const loginResponse = await login();

      if (!loginResponse) {
        throw new Error('Login failed!');
      } else if (
        ![StatusCodes.OK, StatusCodes.CREATED].includes(loginResponse.status)
      ) {
        throw new Error('Login failed!');
      }

      return {
        ...user,
        role: loginResponse.data.role,
      };
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const isAdmin = useMemo(() => {
    if (user?.role) {
      if (user.role === ERole.ADMIN) return true;
    }

    return false;
  }, [user]);

  useEffect(() => {
    if (isError) {
      firebaseSignOut();
      notifications.show({
        title: 'Error',
        message: error?.message || 'An error occurred',
        color: 'red',
      });
    }
  }, [isError, error]);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      refetch();
    });
  }, [refetch]);

  return (
    <AuthContext.Provider
      value={{
        signInGoogle: signInWithGoogle,
        signOut: firebaseSignOut,
        user: user || null,
        isAdmin: isAdmin,
        isLoading: isLoading || isFetching,
      }}
    >
      {!isAdmin || !user ? <Login /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
