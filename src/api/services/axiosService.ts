import axios, { AxiosInstance } from 'axios';

import config from '../../config/config';
import { StartSessionResponse } from '../../interfaces';

import { errorCodes } from './errorCodes';

const axiosInstance: AxiosInstance = axios.create({ baseURL: config.baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('radical-form-token');
    const nonce = window.radicalFormAjaxObj?.nonce ?? '';

    if (config.headers) {
      if (token) {
        config.headers = config.headers || {};
        config.headers['X-Auth-Radical-Form'] = token;
      }
      if (nonce) {
        config.headers = config.headers || {};
        config.headers['X-WP-Nonce'] = nonce;
      }
    }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (
      response.headers['X-WP-Nonce'] &&
      response.headers['X-WP-Nonce'] !== window.radicalFormAjaxObj?.nonce
    ) {
      window.radicalFormAjaxObj = {
        ajax_url: window.radicalFormAjaxObj?.ajax_url ?? config.ajaxRoute,
        nonce: response.headers['X-WP-Nonce'],
      };
    }
    return response;
  },
  async (error) => {
    if (
      error.response &&
      error.response.status === 412 &&
      error.response.data.code === errorCodes[error.response.status]
    ) {
      await startSession();
      const config = error.config;
      config.headers['X-Auth-Radical-Form'] =
        localStorage.getItem('radical-form-token');
      return axiosInstance.request(config);
    }
  }
);

export const startSession = async (): Promise<void> => {
  try {
    const { data } = await axiosInstance.post<StartSessionResponse>(
      `${config.apiRoute}/start-session`
    );
    localStorage.setItem('radical-form-token', data.token);
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
