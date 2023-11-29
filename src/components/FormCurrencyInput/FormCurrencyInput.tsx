import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { StepTwoValues } from '../../interfaces';
import { NumericFormat } from 'react-number-format';
import { SharedTypographyStyles } from '../../theme/styles/StyledTypography';

const StyledCurrencyInput = styled.input`
  ${SharedTypographyStyles}
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
      render={({ field: { ref, onChange, value, ...fieldProps } }) => (
        <NumericFormat
          allowNegative={false}
          thousandSeparator={true}
          prefix={'₪'}
          placeholder={placeholder}
          customInput={StyledCurrencyInput}
          getInputRef={ref}
          value={value}
          onValueChange={(values) => {
            onChange(String(values.floatValue));
          }}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          {...fieldProps}
        />
      )}
    />
  );
};

export default FormCurrencyInput;
