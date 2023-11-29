export type StepOneValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date | null;
  checkbox: boolean;
};

export type RadioButtonValue = {
  label: string;
  value: number;
};

export type StepTwoValues = {
  customAmount: string | null;
  selectedAmount: number | null;
};

export interface FormValues {
  formDataStepOne: StepOneValues;
  formDataStepTwo: StepTwoValues;
}

export type CheckmarkStatus = 'valid' | 'focused' | 'neutral';
