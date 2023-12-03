import { string, object } from 'yup';

export const stepTwoSchema = object()
  .shape(
    {
      selectedAmount: string()
        .notRequired()
        .when('customAmount', {
          is: (customAmount: string | null) =>
            !customAmount || customAmount.trim() === '',
          then: (schema) => schema.required('Selected amount is required'),
          otherwise: (schema) => schema.notRequired(),
        }),
      customAmount: string()
        .notRequired()
        .when('selectedAmount', {
          is: (selectedAmount: string | null) =>
            !selectedAmount || selectedAmount.trim() === '',
          then: (schema) =>
            schema
              .required('Custom amount is required')
              .test(
                'is-greater-than-50',
                'Custom amount must be at least 50',
                (value) => !value || Number(value) >= 50
              ),
          otherwise: (schema) => schema.notRequired(),
        }),
    },
    [['selectedAmount', 'customAmount']]
  )
  .test(
    'at-least-one',
    'Either selected amount or custom amount must be provided',
    (values) => {
      return (
        !!(values.selectedAmount && values.selectedAmount.trim()) ||
        !!(values.customAmount && values.customAmount.trim())
      );
    }
  );
