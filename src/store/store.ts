import { createStore } from "little-state-machine";
import { StepOneValues, StepTwoValues } from "../interfaces";

export interface State {
  formData: {
    formDataStepOne: StepOneValues;
    formDataStepTwo: StepTwoValues;
  };
}

createStore({
  formData: {
    formDataStepOne: {} as StepOneValues,
    formDataStepTwo: {} as StepTwoValues,
  },
});
