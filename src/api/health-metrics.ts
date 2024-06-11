import { API } from '../common/constants';
import { TResponse } from '../common/types';
import { THealthMetricTDEEResponse } from '../common/types/response/health-metric-tdee';
import axiosClient from '../lib/axiosClient';

export const getHealthMetrics = async () => {
  const response = await axiosClient<TResponse<THealthMetricTDEEResponse>>({
    url: API.GET_HEALTH_METRICS,
    method: 'GET',
  });

  return response.data;
};
