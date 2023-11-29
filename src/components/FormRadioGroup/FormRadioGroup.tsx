import React from 'react';
import styled from 'styled-components';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { RadioButtonValue, StepTwoValues } from '../../interfaces';
import { SharedTypographyStyles } from '../../theme/styles/StyledTypography';
import { ErrorMessage } from '@hookform/error-message';
import { StyledErrorMessage } from '../../theme/styles/StyledErrorMessage';

const StyledButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  margin: 0 auto 1rem;
  max-width: 320px;
  gap: 0.5rem;

  > * :last-child {
    grid-column: 1 / -1;
  }
`;

const RadioButtonLabel = styled.label<{
  checked: boolean;
}>`
  ${SharedTypographyStyles}
  display: inline-flex;
  width: 97px;
  height: 97px;
  max-width: 100%;
  border-radius: ${(props) => props.theme.borderRadius.radio};
  background-color: ${(props) =>
    props.checked ? props.theme.color.main : props.theme.color.white};
  color: ${(props) =>
    props.checked ? props.theme.color.white : props.theme.color.black};
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
  grid-column: auto;
  &:hover {
    cursor: pointer;
  }
`;

const RadioButtonInput = styled.input`
  display: none; // Hide the actual input
`;

const ChildrenWrapper = styled.div`
  position: relative;
  grid-column: 1 / -1;
  width: 100%;
  input {
    width: 100%;
  }
`;

interface FormRadioButtonGroupProps {
  options: RadioButtonValue[];
  userAge?: number;
  children?: React.ReactNode;
}

const FormRadioButtonGroup: React.FC<FormRadioButtonGroupProps> = ({
  userAge = 100,
  options,
  children,
}) => {
  const { control, formState, setValue } = useFormContext<StepTwoValues>();
  const customAmount = useWatch({ name: 'customAmount', exact: true });
  const selectedValue = useWatch({ name: 'selectedAmount', exact: true });

  const handleRadioClick = (
    option: RadioButtonValue,
    selectedValue: number | null,
    onChange: (value: number | null) => void
  ) => {
    if (selectedValue !== option?.value) {
      setValue('customAmount', '');
    } else {
      setValue('selectedAmount', null);
    }
    onChange(selectedValue === option?.value ? null : option.value);
  };

  React.useEffect(() => {
    if (customAmount) {
      setValue('selectedAmount', null);
    }
  }, [customAmount, setValue]);

  const availableOptions = React.useMemo(() => {
    if (userAge > 25) {
      return options.filter((option) => option?.value !== 25);
    }
    return options;
  }, [options, userAge]);

  const renderRadioButton = (
    option: RadioButtonValue,
    index: number,
    total: number
  ) => {
    let gridColumn = 'auto';
    const isLastRowStart = total % 3 === 1 && index === total - 1;
    const isSecondLastRowStart = total % 3 === 2 && index === total - 2;

    if (isLastRowStart) {
      // Center the last item if it's alone in the last row
      gridColumn = '2 / 3';
    } else if (isSecondLastRowStart) {
      // If there are two items in the last row, start at the first and third column
      gridColumn = index % 3 === 0 ? '1 / 2' : '3 / 4';
    }

    return (
      <Controller
        key={option?.value}
        name='selectedAmount'
        control={control}
        render={({ field }) => (
          <>
            <RadioButtonLabel
              checked={selectedValue === option?.value}
              htmlFor={`radio-button-${index + 1}`}
              onClick={() =>
                handleRadioClick(option, selectedValue, field.onChange)
              }
              style={{
                gridColumn,
              }}>
              {option?.label}
            </RadioButtonLabel>
            <RadioButtonInput
              type='radio'
              {...field}
              value={option?.value}
              checked={selectedValue === option?.value}
              id={`radio-button-${index + 1}`}
            />
          </>
        )}
      />
    );
  };

  return (
    <StyledButtonGroup>
      {availableOptions.map((option, index) =>
        renderRadioButton(option, index, availableOptions.length)
      )}
      <ChildrenWrapper style={{ gridRow: Math.ceil(options.length / 3) + 1 }}>
        {children}
      </ChildrenWrapper>
      <ChildrenWrapper>
        <ErrorMessage
          name='selectedAmount'
          errors={formState.errors}
          render={({ message }) => (
            <StyledErrorMessage>{message}</StyledErrorMessage>
          )}
        />
        <ErrorMessage
          name='customAmount'
          errors={formState.errors}
          render={({ message }) => (
            <StyledErrorMessage>{message}</StyledErrorMessage>
          )}
        />
      </ChildrenWrapper>
    </StyledButtonGroup>
  );
};

export default FormRadioButtonGroup;
