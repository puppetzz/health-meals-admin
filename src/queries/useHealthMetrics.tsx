'use client';

import { useQuery } from '@tanstack/react-query';
import { getHealthMetrics } from '../api/health-metrics';
import { QueryKey } from '../common/constants';

export const useHealthMetricsQuery = () => {
  return useQuery({
    queryKey: [QueryKey.GET_HEALTH_METRICS],
    queryFn: async () => {
      const healthMetrics = await getHealthMetrics();

      return healthMetrics;
    },
  });
};
