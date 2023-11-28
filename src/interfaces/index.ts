export type StepOneValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  checkbox: boolean;
};

export type RadioButtonValue = {
  label: string;
  value: string;
};

export type StepTwoValues = {
  customAmount: string | null;
  selectedAmount: RadioButtonValue | null;
};

export interface FormValues {
  formDataStepOne: StepOneValues;
  formDataStepTwo: StepTwoValues;
}

export type CheckmarkStatus = "valid" | "focused" | "neutral";
