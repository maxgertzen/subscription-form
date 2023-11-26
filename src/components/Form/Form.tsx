import React from "react";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import FormTextInput from "../FormTextInput/FormTextInput";
import styled from "styled-components";
import FormDatePicker from "../FormDatePicker/FormDatePicker";

import { STRINGS } from "../../language";
import FormCheckbox from "../FormCheckbox/FormCheckbox";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  direction: rtl;
`;

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: Date;
  checkbox: boolean;
}

const Form: React.FC = () => {
  const methods = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const { FORM_LABELS } = STRINGS;

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormTextInput label={FORM_LABELS.FIRST_NAME} name='firstName' />
        <FormTextInput label={FORM_LABELS.LAST_NAME} name='lastName' />
        <FormTextInput
          label={FORM_LABELS.MOBILE_PHONE}
          name='phoneNumber'
          type='tel'
        />
        <FormTextInput label={FORM_LABELS.EMAIL} name='email' type='email' />
        <FormDatePicker label={FORM_LABELS.DATE_OF_BIRTH} name='dateOfBirth' />
        <FormCheckbox label={FORM_LABELS.CHECKBOX} name='checkbox' />
        <input type='submit' />
      </StyledForm>
    </FormProvider>
  );
};

export default Form;
