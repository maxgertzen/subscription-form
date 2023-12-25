import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { EmailResponse, FormValues, StepOneValues } from '../../../interfaces';
import { STRINGS } from '../../../language';
import StyledForm from '../../../theme/styles/StyledForm';
import { stepOneSchema } from '../../../validations';
import Button from '../../Button/Button';
import FormCheckbox from '../../FormCheckbox/FormCheckbox';
import FormDatePicker from '../../FormDatePicker/FormDatePicker';
import FormTextInput from '../../FormTextInput/FormTextInput';

interface StepOneFormProps {
  initialValues: Partial<StepOneValues>;
  handleUpdate: (data: Partial<FormValues>) => void;
  setStep: () => void;
  handleSubmit: (email: string) => Promise<EmailResponse | undefined>;
}

const StepOneForm: React.FC<StepOneFormProps> = ({
  initialValues,
  setStep,
  handleUpdate,
  handleSubmit,
}) => {
  const methods = useForm<StepOneValues>({
    defaultValues: initialValues,
    mode: 'all',
    resolver: yupResolver(stepOneSchema),
  });

  const onSubmit: SubmitHandler<StepOneValues> = async (submittedData) => {
    handleUpdate({ formDataStepOne: submittedData });
    const data = await handleSubmit(submittedData.email);
    if (data && 'isNew' in data) {
      setStep();
    }
  };

  const { FORM_LABELS, BUTTONS } = STRINGS;

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
        <FormDatePicker label={FORM_LABELS.DATE_OF_BIRTH} />
        <FormCheckbox label={FORM_LABELS.CHECKBOX} />
        <Button disabled={!methods.formState.isValid} label={BUTTONS.NEXT} />
      </StyledForm>
    </FormProvider>
  );
};

export default StepOneForm;
