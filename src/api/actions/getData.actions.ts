import React from 'react';
import {
  InitialValuesResponse,
  ProductVariationsResponse,
} from '../../interfaces';
import useApiCallback from '../hooks/useApiCallback';

const useUserInitialValues = () => {
  const [result, setResult] = React.useState<InitialValuesResponse>();
  const fetchData = useApiCallback<InitialValuesResponse>({
    url: 'form-data',
    type: 'GET',
    withError: false,
    withLoading: false,
  });

  React.useEffect(() => {
    (async () => {
      if (!result) {
        const data = await fetchData();
        setResult(data as InitialValuesResponse);
      }
    })();
  }, []);

  return result as InitialValuesResponse;
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

export { useUserInitialValues, useProductVariationOptions };
