import { object, string, date, boolean, DateSchema, BooleanSchema } from 'yup';

import { STRINGS } from '../language';

export const stepOneSchema = object({
  firstName: string().max(50).required(STRINGS.FORM_ERRORS.REQUIRED),
  lastName: string().max(50).required(STRINGS.FORM_ERRORS.REQUIRED),
  phoneNumber: string()
    .matches(/^\+?[0-9]{1,12}$/, STRINGS.FORM_ERRORS.INVALID_PHONE)
    .required(STRINGS.FORM_ERRORS.REQUIRED),
  email: string()
    .email(STRINGS.FORM_ERRORS.INVALID_EMAIL)
    .required(STRINGS.FORM_ERRORS.REQUIRED),
  dateOfBirth: date()
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      STRINGS.FORM_ERRORS.INVALID_DATE
    )
    .nullable()
    .required(STRINGS.FORM_ERRORS.REQUIRED) as DateSchema<Date | null>,
  checkbox: boolean() as BooleanSchema<boolean>,
});
