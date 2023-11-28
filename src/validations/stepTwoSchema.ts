import { string, object, StringSchema, ObjectSchema } from "yup";

export const stepTwoSchema = object().shape(
  {
    selectedAmount: object({
      label: string(),
      value: string(),
    })
      .when("customAmount", {
        is: null,
        then: (schema) => schema.nonNullable(),
        otherwise: (schema) => schema.notRequired(),
      })
      .nullable() as ObjectSchema<{ label: string; value: string } | null>,
    customAmount: string()
      .when("selectedAmount", {
        is: null,
        then: (schema) => schema.required("Custom amount is required"),
        otherwise: (schema) => schema.notRequired(),
      })
      .nullable() as StringSchema<string | null>,
  },
  [["selectedAmount", "customAmount"]]
);
