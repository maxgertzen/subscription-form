import { AxiosError, isAxiosError } from 'axios';
import { useStateMachine } from 'little-state-machine';

import config from '../../config/config';
import {
  AjaxResponse,
  EmailResponse,
  ProductVariationsRequestBody,
  SuccessfullResponse,
  UserDetailsRequestBody,
  WPErrorResponse,
} from '../../interfaces';
import * as actions from '../../store/actions';
import useApiCallback from '../hooks/useApiCallback';

const useCheckUserEmail = () => {
  const { actions: stateActions, state } = useStateMachine({ ...actions });
  const checkUserEmail = useApiCallback<EmailResponse>({
    url: `${config.apiRoute}/check-email`,
    type: 'POST',
    withError: false,
    withLoading: true,
  });

  return async (email: string) => {
    try {
      const data = await checkUserEmail({
        email: email ?? state?.formData?.formDataStepOne?.email ?? '',
      });
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        const serverError = error as AxiosError<WPErrorResponse>;
        if (serverError && serverError.response?.data?.code) {
          stateActions.updateStore({
            isWarning: true,
            warningCode: serverError.response.data.code,
          });
        }
      } else {
        stateActions.updateStore({
          isError: true,
        });
      }
    }
  };
};

const usePostFormData = () => {
  const { actions: stateActions } = useStateMachine({ ...actions });

  const postUserData = useApiCallback<
    SuccessfullResponse,
    UserDetailsRequestBody
  >({
    url: `${config.apiRoute}/user-submit`,
    type: 'POST',
    withLoading: false,
  });
  const postUserSelection = useApiCallback<
    AjaxResponse,
    ProductVariationsRequestBody
  >({
    url:
      `${window.radicalFormAjaxObj?.ajax_url}?action=handle_set_variation_selection` ??
      config.ajaxRoute,
    type: 'POST',
    withLoading: false,
  });

  return async ({
    price,
    variationId,
    action = 'handle_set_variation_selection',
    ...userData
  }: UserDetailsRequestBody & ProductVariationsRequestBody) => {
    try {
      stateActions.updateStore({ isLoading: true });
      const userResponse = await postUserData(userData);
      if (userResponse) {
        const selectionResponse = await postUserSelection({
          action,
          price,
          variationId,
        });
        window.dispatchEvent(new CustomEvent('radical-cart-updated'));
        return selectionResponse;
      }
    } catch (error) {
      stateActions.updateStore({ isError: true });
    } finally {
      stateActions.updateStore({ isLoading: false });
    }
  };
};

export { useCheckUserEmail, usePostFormData };
