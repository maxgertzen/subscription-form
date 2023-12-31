import React from 'react';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { STRINGS } from '../../../language';
import {
  FormValues,
  ProductVariationsResponse,
  ProductVariationsRequestBody,
  StepTwoValues,
  ProductVariationOption,
  RadioButtonValue,
} from '../../../interfaces';
import StyledForm from '../../../theme/styles/StyledForm';
import FormRadioButtonGroup from '../../FormRadioGroup/FormRadioGroup';
import FormCurrencyInput from '../../FormCurrencyInput/FormCurrencyInput';
import Button from '../../Button/Button';
import { stepTwoSchema } from '../../../validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUserAge } from '../../../utils/getUserAge';

interface StepTwoFormProps {
  options: ProductVariationsResponse['options'];
  userAge?: Date | null;
  setStep: () => void;
  handleUpdate: (data: Partial<FormValues>) => void;
  handleSubmit: (body: ProductVariationsRequestBody) => Promise<void>;
  handleBack: () => void;
}

const StepTwoForm: React.FC<StepTwoFormProps> = ({
  userAge = null,
  options,
  setStep,
  handleBack,
  handleUpdate,
  handleSubmit,
}) => {
  const [selectedAmount, setSelectedAmount] = React.useState<string | null>('');
  const methods = useForm<StepTwoValues>({
    mode: 'all',
    resolver: yupResolver(stepTwoSchema),
  });

  const customAmount = methods.watch('customAmount');
  const onSubmit: SubmitHandler<StepTwoValues> = async (formData) => {
    handleUpdate({ formDataStepTwo: formData });

    let selectedVariation: ProductVariationOption | undefined;

    if (formData.customAmount) {
      selectedVariation = options.find(
        (variation) => variation.isCustomPriceId
      );
    } else if (formData.selectedAmount) {
      selectedVariation = options.find(
        (variation) => variation.variationId === Number(formData.selectedAmount)
      );
    }

    if (selectedVariation?.variationId) {
      await handleSubmit({
        variationId: selectedVariation.variationId,
        price: selectedVariation.isCustomPriceId
          ? Number(formData.customAmount)
          : selectedVariation.price,
      });
      setStep();
    }
  };

  const handleRadioClick = (
    option: RadioButtonValue,
    onChange: (value: string | null) => void
  ) => {
    const selectedVariation =
      option.value === Number(selectedAmount) ? '' : String(option.value);
    onChange(selectedVariation);
    setSelectedAmount(selectedVariation);

    methods.setValue('customAmount', '');
    if (selectedVariation) methods.clearErrors('customAmount');
  };

  const radioOptions = React.useMemo(() => {
    if (!options) return [];

    const isEligibleOption = (
      option: ProductVariationOption,
      userAge: Date | null
    ) => {
      if (option.isCustomPriceId) return false;
      if ((getUserAge(userAge) ?? 50) > 25 && option.price === 25) return false;
      return true;
    };

    const filteredOptions = options.filter((option) =>
      isEligibleOption(option, userAge)
    );

    const limitedOptions = filteredOptions.slice(0, 6);

    return limitedOptions.map((variation) => ({
      label: `${variation.price} \u20AA`,
      value: variation.variationId,
    }));
  }, [options, userAge]);

  const { FORM_LABELS, BUTTONS } = STRINGS;

  React.useEffect(() => {
    if (customAmount) {
      setSelectedAmount('');
      methods.setValue('selectedAmount', '');
    } else if (methods.watch('selectedAmount')) {
      methods.setValue('customAmount', '');
    }
  }, [methods, customAmount]);

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormRadioButtonGroup
          checkedValue={selectedAmount}
          handleRadioClick={handleRadioClick}
          userAge={getUserAge(userAge)}
          options={radioOptions}>
          <FormCurrencyInput placeholder={FORM_LABELS.CUSTOMER_AMOUNT} />
        </FormRadioButtonGroup>
        <Button disabled={!methods.formState.isValid} label={BUTTONS.SUBMIT} />
        <Button type='button' label={BUTTONS.BACK} handleClick={handleBack} />
      </StyledForm>
    </FormProvider>
  );
};

export default StepTwoForm;
