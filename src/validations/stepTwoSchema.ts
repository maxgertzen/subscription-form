import { number, string, object, NumberSchema, StringSchema } from 'yup';

export const stepTwoSchema = object().shape(
  {
    selectedAmount: number().when('customAmount', {
      is: null,
      then: (schema) => schema.required().nonNullable(),
      otherwise: (schema) => schema.notRequired().nullable(),
    }) as NumberSchema<number | null>,
    customAmount: string().when('selectedAmount', {
      is: null || '',
      then: (schema) =>
        schema.required('Custom amount is required').nonNullable(),
      otherwise: (schema) => schema.notRequired().nullable(),
    }) as StringSchema<string | null>,
  },
  [['selectedAmount', 'customAmount']]
);
