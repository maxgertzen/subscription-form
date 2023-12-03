import React from 'react';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import FormTextInput from '../../FormTextInput/FormTextInput';
import FormDatePicker from '../../FormDatePicker/FormDatePicker';

import { STRINGS } from '../../../language';
import FormCheckbox from '../../FormCheckbox/FormCheckbox';
import {
  FormValues,
  StepOneValues,
  SuccessfullResponse,
  UserDetailsRequestBody,
} from '../../../interfaces';
import StyledForm from '../../../theme/styles/StyledForm';
import Button from '../../Button/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { stepOneSchema } from '../../../validations';
import { formatDate } from '../../../utils/dateFormatter';

interface StepOneFormProps {
  initialValues: Partial<StepOneValues>;
  handleUpdate: (data: Partial<FormValues>) => void;
  setStep: () => void;
  handleSubmit: (
    body?: UserDetailsRequestBody | undefined
  ) => Promise<SuccessfullResponse | undefined>;
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
    await handleSubmit({
      ...submittedData,
      dateOfBirth: formatDate(submittedData.dateOfBirth),
    });
    setStep();
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
