import { createStore } from 'little-state-machine';
import { StepOneValues, StepTwoValues } from '../interfaces';

export interface State {
  formData: {
    formDataStepOne: Partial<StepOneValues>;
    formDataStepTwo: Partial<StepTwoValues>;
  };
  isLoading: boolean;
  isError: boolean;
}

createStore({
  formData: {
    formDataStepOne: {
      checkbox: true,
    } as StepOneValues,
    formDataStepTwo: {} as StepTwoValues,
  },
  isLoading: false,
  isError: false,
});
