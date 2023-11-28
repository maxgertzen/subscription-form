import React from "react";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import { STRINGS } from "../../../language";
import { FormValues, StepTwoValues } from "../../../interfaces";
import StyledForm from "../../../theme/styles/StyledForm";
import FormRadioButtonGroup from "../../FormRadioGroup/FormRadioGroup";
import FormCurrencyInput from "../../FormCurrencyInput/FormCurrencyInput";
import Button from "../../Button/Button";
import { stepTwoSchema } from "../../../validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { getUserAge } from "../../../utils/getUserAge";

interface StepTwoFormProps {
  initialValues: StepTwoValues;
  userAge: Date;
  handleUpdate: (data: Partial<FormValues>) => void;
  handleSubmit: () => void;
  handleBack: () => void;
}

const StepTwoForm: React.FC<StepTwoFormProps> = ({
  initialValues,
  userAge,
  handleBack,
  handleUpdate,
  handleSubmit,
}) => {
  const methods = useForm<StepTwoValues>({
    defaultValues: initialValues,
    resolver: yupResolver(stepTwoSchema),
  });

  const onSubmit: SubmitHandler<StepTwoValues> = (data) => {
    handleUpdate({ formDataStepTwo: data });

    handleSubmit();
  };

  const { FORM_LABELS, BUTTONS } = STRINGS;

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormRadioButtonGroup
          userAge={getUserAge(userAge)}
          options={[
            { value: "25", label: "25 \u20AA" },
            { value: "50", label: "50 \u20AA" },
            { value: "100", label: "100 \u20AA" },
            { value: "200", label: "200 \u20AA" },
            { value: "500", label: "500 \u20AA" },
            { value: "1000", label: "1000 \u20AA" },
          ]}>
          <FormCurrencyInput placeholder={FORM_LABELS.FIRST_NAME} />
        </FormRadioButtonGroup>
        <Button label={BUTTONS.SUBMIT} />
        <Button type='button' label={BUTTONS.BACK} handleClick={handleBack} />
      </StyledForm>
    </FormProvider>
  );
};

export default StepTwoForm;
