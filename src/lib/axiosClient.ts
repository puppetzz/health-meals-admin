import { envs } from '@/common/constants/envs';
import axios from 'axios';
import { getIdToken } from './firebase';

const axiosClient = axios.create({
  baseURL: envs.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: 'application/json, text/plain, */*',
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] =
      config?.data?.headerContentType || 'application/json';
    return config;
  },
  async (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
