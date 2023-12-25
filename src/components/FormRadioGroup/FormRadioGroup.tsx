import React from 'react';

import { ErrorMessage } from '@hookform/error-message';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { RadioButtonValue, StepTwoValues } from '../../interfaces';
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
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  font-size: 1.15rem;
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
  handleRadioClick: (
    option: RadioButtonValue,
    onChange: (value: string | null) => void
  ) => void;
  checkedValue: string | null;
  children?: React.ReactNode;
}

const FormRadioButtonGroup: React.FC<FormRadioButtonGroupProps> = ({
  options,
  checkedValue,
  handleRadioClick,
  children,
}) => {
  const { control, formState } = useFormContext<StepTwoValues>();

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
        key={index}
        name='selectedAmount'
        control={control}
        render={({ field: { onChange, ...fieldProps } }) => (
          <>
            <RadioButtonLabel
              checked={Number(checkedValue) === option?.value}
              htmlFor={`radio-button-${index + 1}`}
              onClick={() => handleRadioClick(option, onChange)}
              style={{
                gridColumn,
              }}>
              {option?.label}
            </RadioButtonLabel>
            <RadioButtonInput
              type='radio'
              {...fieldProps}
              value={option?.value}
              checked={Number(checkedValue) === option?.value}
              id={`radio-button-${index + 1}`}
            />
          </>
        )}
      />
    );
  };

  return (
    <StyledButtonGroup>
      {options.map((option, index) =>
        renderRadioButton(option, index, options.length)
      )}
      <ChildrenWrapper style={{ gridRow: Math.ceil(options.length / 3) + 1 }}>
        {children}
      </ChildrenWrapper>
      <ChildrenWrapper>
        <ErrorMessage
          name='customAmount'
          errors={formState.errors}
          render={({ message }) => (
            <StyledErrorMessage isCentered>{message}</StyledErrorMessage>
          )}
        />
      </ChildrenWrapper>
    </StyledButtonGroup>
  );
};

export default FormRadioButtonGroup;
