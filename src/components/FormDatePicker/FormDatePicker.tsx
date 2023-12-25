import React from 'react';

import { ErrorMessage } from '@hookform/error-message';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';
import styled, { useTheme } from 'styled-components';

import { StepOneValues } from '../../interfaces';
import { StyledErrorMessage } from '../../theme/styles/StyledErrorMessage';
import StyledInputWithCheckmark from '../../theme/styles/StyledInputWithCheckmark';

interface StyledInputWithCheckmarkProps {
  label: string;
}

const DatePickerWrapper = styled.div`
  .ant-picker {
    &.ant-picker-focused {
      border: none;
      box-shadow: none;
    }
  }
`;

const Label = styled.label<{ $isFocused: boolean }>`
  position: absolute;
  top: ${({ $isFocused }) => ($isFocused ? '-12px' : '5px')};
  right: ${({ $isFocused }) => ($isFocused ? '0px' : '5px')};
  font-size: ${({ $isFocused }) => ($isFocused ? '12px' : '16px')};
  color: ${({ $isFocused, theme }) =>
    $isFocused ? theme.color.grey : theme.color.black};
  transition: all 0.3s ease;
  z-index: 1;
  + div {
    .ant-picker-input input::placeholder {
      color: ${({ $isFocused, theme }) =>
        $isFocused ? theme.color.grey : 'transparent'};
    }
  }
  &:hover {
    cursor: ${({ $isFocused }) => ($isFocused ? 'default' : 'text')};
  }
`;

const FormDatePicker: React.FC<StyledInputWithCheckmarkProps> = ({ label }) => {
  const theme = useTheme();
  const {
    control,
    getValues,
    formState,
    watch,
    setFocus: datePickerFocus,
  } = useFormContext<StepOneValues>();
  const [isFocused, setIsFocused] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const formValue = watch('dateOfBirth');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (onBlur: () => void) => () => {
    const value = getValues('dateOfBirth');
    if (!value) {
      setIsFocused(false);
    }
    onBlur();
  };

  React.useEffect(() => {
    if (formValue) {
      setIsFocused(true);
      setIsValid(true);
    } else {
      setIsFocused(false);
    }
  }, [formValue]);

  return (
    <StyledInputWithCheckmark
      checkmarkStatus={isValid ? 'valid' : isFocused ? 'focused' : 'neutral'}>
      <DatePickerWrapper>
        <Controller
          control={control}
          name='dateOfBirth'
          render={({ field, fieldState }) => (
            <>
              <Label
                onClick={() => {
                  if (!isFocused) {
                    setIsFocused(true);
                    datePickerFocus('dateOfBirth');
                  }
                }}
                $isFocused={isFocused}>
                {label}
              </Label>
              <DatePicker
                ref={field.ref}
                aria-errormessage={fieldState.error?.message}
                value={field.value ? dayjs(field.value) : null}
                allowClear={false}
                placeholder='DD/MM/YYYY'
                format='DD/MM/YYYY'
                picker='date'
                style={{
                  width: '100%',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderTop: 'none',
                  borderRadius: 0,
                  borderBottom: `1px solid ${
                    fieldState.error?.message
                      ? theme.color.red
                      : theme.color.grey
                  }`,
                  padding: '8px 5px',
                  backgroundColor: 'transparent',
                }}
                onFocus={handleFocus}
                onBlur={handleBlur(field.onBlur)}
                onChange={(date, dateString) => {
                  field.onChange(date ? date.toDate() : null);
                  if (dateString === '') {
                    setIsFocused(false);
                  }
                }}
              />
            </>
          )}
        />
      </DatePickerWrapper>
      <ErrorMessage
        name='dateOfBirth'
        errors={formState.errors}
        render={({ message }) => (
          <StyledErrorMessage>{message}</StyledErrorMessage>
        )}
      />
    </StyledInputWithCheckmark>
  );
};

export default FormDatePicker;
