import React from 'react';

import {
  InitialValuesResponse,
  ProductVariationsResponse,
  StepOneValues,
} from '../../interfaces';
import { convertToDate } from '../../utils/dateFormatter';
import useApiCallback from '../hooks/useApiCallback';

const useUserInitialValues = () => {
  const [result, setResult] = React.useState<StepOneValues>();
  const fetchData = useApiCallback<InitialValuesResponse>({
    url: 'form-data',
    type: 'GET',
    withError: false,
    withLoading: false,
  });

  React.useEffect(() => {
    const asyncCallback = async () => {
      if (!result) {
        const data = await fetchData();
        const dateOfBirth = convertToDate(data?.dateOfBirth);
        setResult({ ...data, dateOfBirth } as StepOneValues);
      }
    };
    asyncCallback();
  }, [fetchData, result]);

  return result;
};

const useProductVariationOptions = () => {
  const [result, setResult] = React.useState<ProductVariationsResponse>();
  const fetchData = useApiCallback<ProductVariationsResponse>({
    url: 'product-variations',
    type: 'GET',
    withError: false,
    withLoading: false,
  });

  React.useEffect(() => {
    (async () => {
      if (!result) {
        const data = await fetchData();
        setResult(data as ProductVariationsResponse);
      }
    })();
  }, []);

  return result as ProductVariationsResponse;
};

export { useProductVariationOptions,useUserInitialValues };
