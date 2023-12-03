import React from 'react';

import { useCallback } from 'react';
import axiosInstance from '../services/axiosService';
import { useStateMachine } from 'little-state-machine';
import * as actions from '../../store/actions';

type RequestType = 'GET' | 'POST';

interface RequestConfig {
  url: string;
  type: RequestType;
  withLoading?: boolean;
  withError?: boolean;
}

const useApiCallback = <TResponse, TRequestBody = unknown>({
  url,
  type,
  withLoading = true,
  withError = true,
}: RequestConfig): ((
  body?: TRequestBody
) => Promise<TResponse | undefined>) => {
  const { actions: stateActions } = useStateMachine({ ...actions });

  const apiCallback = useCallback(
    async (requestBody?: TRequestBody) => {
      try {
        if (withLoading) {
          stateActions.updateStore({
            isLoading: true,
          });
        }
        let response;

        if (type === 'GET') {
          response = await axiosInstance.get<TResponse>(url);
        } else if (type === 'POST') {
          response = await axiosInstance.post<TResponse>(url, requestBody);
        } else {
          return;
        }

        if (withLoading) {
          stateActions.updateStore({
            isLoading: false,
          });
        }
        return await response.data;
      } catch (error) {
        stateActions.updateStore({
          isError: withError,
          isLoading: false,
        });
        throw error;
      }
    },
    [url, type]
  );

  React.useEffect(() => {
    return () => {
      stateActions.updateStore({
        isError: false,
        isLoading: false,
      });
    };
  }, []);

  return apiCallback;
};

export default useApiCallback;
