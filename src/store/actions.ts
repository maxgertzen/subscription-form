import { FormValues } from "../interfaces";
import { State } from "./store"; // Import your state type

export const updateForm = (state: State, payload: Partial<FormValues>) => ({
  ...state,
  formData: {
    formDataStepOne: {
      ...state.formData.formDataStepOne,
      ...payload.formDataStepOne,
    },
    formDataStepTwo: {
      ...state.formData.formDataStepTwo,
      ...payload.formDataStepTwo,
    },
  },
});

export default updateForm;
