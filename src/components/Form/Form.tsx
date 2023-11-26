import React from "react";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
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

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput label='First Name' name='firstName' />
        <FormInput label='Last Name' name='lastName' />
        <FormInput label='Phone Number' name='phoneNumber' />
        <FormInput label='Email' name='email' />
        <FormInput label='Date of Birth' name='dateOfBirth' />
        <FormInput label='Checkbox' name='checkbox' />
        <input type='submit' />
      </StyledForm>
    </FormProvider>
  );
};

export default Form;
