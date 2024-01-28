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
  customAmount?: string | null;
  selectedAmount?: string | null;
};

export interface FormValues {
  formDataStepOne: Partial<StepOneValues>;
  formDataStepTwo: Partial<StepTwoValues>;
}

export interface StartSessionResponse {
  token: string;
}

export type InitialValuesResponse = Omit<
  StepOneValues,
  'checkbox' | 'dateOfBirth'
> & {
  dateOfBirth: string;
};

export type UserDetailsRequestBody = Omit<
  StepOneValues,
  'checkbox' | 'dateOfBirth'
> & {
  dateOfBirth: string;
};

export type SuccessfullResponse = {
  message: string;
};

export type AjaxResponse = {
  data: { message: string };
  success: boolean;
};

export type EmailResponse = {
  isNew: boolean;
};

export type ProductVariationOption = {
  variationId: number;
  price: number;
  isCustomPriceId: boolean;
};

export type ProductVariationsResponse = {
  options: ProductVariationOption[];
};

export type ProductVariationsRequestBody = {
  _ajax_nonce?: string;
  action?: string;
  variationId: number;
  price: number;
};

export interface ApplicationStatus {
  isLoading: boolean;
  isError: boolean;
  isWarning: boolean;
  warningCode: string;
}

export type CheckmarkStatus = 'valid' | 'focused' | 'neutral';

export interface WPErrorResponse {
  code: string;
  message: string;
  data: {
    status: number;
  };
}
