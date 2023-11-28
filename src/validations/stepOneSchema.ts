import * as yup from "yup";

export const stepOneSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  dateOfBirth: yup.date().required("Date of birth is required"),
  checkbox: yup.boolean() as yup.BooleanSchema<boolean>,
});
