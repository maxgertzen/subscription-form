import {
  SuccessfullResponse,
  ProductVariationsRequestBody,
  UserDetailsRequestBody,
} from '../../interfaces';
import useApiCallback from '../hooks/useApiCallback';

const usePostUserData = () => {
  const postDataCallback = useApiCallback<
    SuccessfullResponse,
    UserDetailsRequestBody
  >({
    url: 'user',
    type: 'POST',
  });
  return postDataCallback;
};

const usePostProductVariation = () => {
  const postDataCallback = useApiCallback<
    SuccessfullResponse,
    ProductVariationsRequestBody
  >({
    url: 'set-selection',
    type: 'POST',
  });
  return postDataCallback;
};

export { usePostUserData, usePostProductVariation };
