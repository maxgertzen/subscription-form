import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useFormContext, Controller } from 'react-hook-form';
import StyledInputWithCheckmark from '../../theme/styles/StyledInputWithCheckmark';
import { DatePicker } from 'antd';
import { StepOneValues } from '../../interfaces';
import * as dayjs from 'dayjs';
import { SharedTypographyStyles } from '../../theme/styles/StyledTypography';
import { ErrorMessage } from '@hookform/error-message';
import { StyledErrorMessage } from '../../theme/styles/StyledErrorMessage';

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

const Label = styled.label<{ isFocused: boolean }>`
  ${SharedTypographyStyles}
  position: absolute;
  top: ${(props) => (props.isFocused ? '-12px' : '10px')};
  right: ${(props) => (props.isFocused ? '0px' : '5px')};
  font-size: ${(props) => (props.isFocused ? '12px' : '16px')};
  color: ${({ isFocused, theme }) =>
    isFocused ? theme.color.grey : theme.color.black};
  transition: all 0.3s ease;
  z-index: 1;
`;

const FormDatePicker: React.FC<StyledInputWithCheckmarkProps> = ({ label }) => {
  const theme = useTheme();
  const { control, getValues, setValue, formState, watch } =
    useFormContext<StepOneValues>();
  const [isFocused, setIsFocused] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const formValue = watch('dateOfBirth');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    const value = getValues('dateOfBirth');
    if (!value) {
      setIsFocused(false);
    }
  };

  React.useEffect(() => {
    if (formValue) {
      setIsFocused(true);
      setIsValid(true);
    } else {
      setIsFocused(false);
    }
  }, []);

  return (
    <StyledInputWithCheckmark
      checkmarkStatus={isValid ? 'valid' : isFocused ? 'focused' : 'neutral'}>
      <Label isFocused={isFocused}>{label}</Label>
      <DatePickerWrapper>
        <Controller
          control={control}
          name='dateOfBirth'
          render={({ field: { value, onChange, ...restField } }) => (
            <DatePicker
              {...restField}
              aria-errormessage={formState.errors.dateOfBirth?.message}
              value={value && dayjs(value)}
              allowClear={false}
              placeholder=' '
              format='DD/MM/YYYY'
              picker='date'
              style={{
                width: '100%',
                borderLeft: 'none',
                borderRight: 'none',
                borderTop: 'none',
                borderRadius: 0,
                borderBottom: `1px solid ${
                  formState.errors.dateOfBirth?.message
                    ? theme.color.red
                    : theme.color.grey
                }`,
                padding: '8px 5px',
                backgroundColor: 'transparent',
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(date, dateString) => {
                onChange();
                if (date !== null)
                  setValue('dateOfBirth', dayjs(date).toDate(), {
                    shouldValidate: true,
                  });
                else {
                  setValue('dateOfBirth', null, { shouldValidate: true });
                }
                if (dateString === '') {
                  setIsFocused(false);
                }
              }}
            />
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
