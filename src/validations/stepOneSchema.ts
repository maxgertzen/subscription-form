import * as yup from 'yup';
import { STRINGS } from '../language';

export const stepOneSchema = yup.object({
  firstName: yup.string().max(50).required(STRINGS.FORM_ERRORS.REQUIRED),
  lastName: yup.string().max(50).required(STRINGS.FORM_ERRORS.REQUIRED),
  phoneNumber: yup
    .string()
    .matches(/^\+?[0-9]{1,12}$/, STRINGS.FORM_ERRORS.INVALID_PHONE)
    .required(STRINGS.FORM_ERRORS.REQUIRED),
  email: yup
    .string()
    .email(STRINGS.FORM_ERRORS.INVALID_EMAIL)
    .required(STRINGS.FORM_ERRORS.REQUIRED),
  dateOfBirth: yup
    .date()
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      STRINGS.FORM_ERRORS.INVALID_DATE
    )
    .nullable()
    .required(STRINGS.FORM_ERRORS.REQUIRED) as yup.DateSchema<Date | null>,
  checkbox: yup.boolean() as yup.BooleanSchema<boolean>,
});
