import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useCreateQueryString = () => {
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);
      for (const key in newParams) {
        params.set(key, newParams[key]);
      }
      return params.toString();
    },
    [searchParams]
  );

  return createQueryString;
};
