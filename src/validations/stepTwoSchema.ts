import { object,string } from 'yup';

import { STRINGS } from '../language';

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
              .required(STRINGS.FORM_ERRORS.REQUIRED_SELECTION)
              .test(
                'is-greater-than-50',
                STRINGS.FORM_ERRORS.INVALID_AMOUNT,
                (value) => !value || Number(value) >= 50
              ),
          otherwise: (schema) => schema.notRequired(),
        }),
    },
    [['selectedAmount', 'customAmount']]
  )
  .test('at-least-one', STRINGS.FORM_ERRORS.REQUIRED_SELECTION, (values) => {
    return (
      !!(values.selectedAmount && values.selectedAmount.trim()) ||
      !!(values.customAmount && values.customAmount.trim())
    );
  });
