// src/services/axiosService.ts
import axios, { AxiosInstance } from 'axios';
import { StartSessionResponse } from '../../interfaces';
import { errorCodes } from './errorCodes';

const baseURL =
  'https://8e9715b2-bc5f-42cf-8209-554284dfeefc.mock.pstmn.io/radical-form/v1/';

const axiosInstance: AxiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers = config.headers || {};
      config.headers['x-auth-radical-form'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data.code === errorCodes[error.response.status]
    ) {
      await startSession();
      const config = error.config;
      config.headers['x-auth-radical-form'] = localStorage.getItem('token');
      return axiosInstance.request(config);
    }
    if (
      error.response &&
      error.response.status === 404 &&
      error.response.data.code !== errorCodes[error.response.status]
    ) {
      throw new Error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export const startSession = async (): Promise<void> => {
  try {
    const { data } =
      await axiosInstance.post<StartSessionResponse>('start-session');
    localStorage.setItem('token', data.token);
  } catch (error) {
    if (error instanceof Error) {
      const newError = new Error(error.message);
      newError.stack = error.stack;
      throw newError;
    }
    throw error;
  }
};

export default axiosInstance;
