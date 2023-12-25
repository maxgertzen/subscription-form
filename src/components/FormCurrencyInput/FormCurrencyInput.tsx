import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import styled from 'styled-components';

import { StepTwoValues } from '../../interfaces';

const StyledCurrencyInput = styled.input`
  &&[type] {
    flex: 1;
    padding: 10px 0;
    background-color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    text-align: center;
    &:focus-visible {
      outline: none;
    }
  }
`;

interface FormCurrencyInputProps {
  placeholder?: string;
}
const FormCurrencyInput: React.FC<FormCurrencyInputProps> = ({
  placeholder,
}) => {
  const { control } = useFormContext<StepTwoValues>();

  return (
    <Controller
      name='customAmount'
      control={control}
      render={({ field: { onChange, value } }) => (
        <NumericFormat
          allowNegative={false}
          thousandSeparator={true}
          prefix='₪'
          placeholder={placeholder}
          customInput={StyledCurrencyInput}
          value={value ?? ''}
          onValueChange={(values) => {
            onChange(values.value);
          }}
        />
      )}
    />
  );
};

export default FormCurrencyInput;
