import React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import StyledInputWithCheckmark from '../../theme/styles/StyledInputWithCheckmark';
import { SharedTypographyStyles } from '../../theme/styles/StyledTypography';
import { StepOneValues } from '../../interfaces';
import { ErrorMessage } from '@hookform/error-message';
import { StyledErrorMessage } from '../../theme/styles/StyledErrorMessage';

interface StyledInputWithCheckmarkProps {
  label: string;
  name: keyof StepOneValues;
  type?: 'text' | 'tel' | 'email';
}

const InputField = styled.input<{ isErrored?: boolean }>`
  ${SharedTypographyStyles}
  width: 100%;
  padding: 10px 0;
  border: unset;
  border-bottom: 1px solid ${({ theme, isErrored }) =>
    isErrored ? theme.color.red : theme.color.grey};
  outline: none;
  background-color: transparent;
  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -20px;
    right: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.color.grey}};
  }
`;

const Label = styled.label<{ isFocused: boolean; isErrored?: boolean }>`
  ${SharedTypographyStyles}
  position: absolute;
  top: ${(props) => (props.isFocused ? '-16px' : '9px')};
  right: ${(props) => (props.isFocused ? '0px' : '5px')};
  font-size: ${(props) => (props.isFocused ? '12px' : '16px')};
  color: ${(props) =>
    props.isFocused ? props.theme.color.grey : props.theme.color.black};
  transition: all 0.3s ease;
  pointer-events: none;
`;

const FormTextInput: React.FC<StyledInputWithCheckmarkProps> = ({
  label,
  name,
  type = 'text',
}) => {
  const { register, getFieldState, formState, watch } =
    useFormContext<StepOneValues>();
  const [isFocused, setIsFocused] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);

  const { onBlur, onChange, ...restRegister } = register(name);
  const formValue = watch(name);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur && typeof onBlur === 'function') {
      onBlur(event);
    }
    if (getFieldState(name)?.invalid || !event.target.value) {
      setIsFocused(false);
      return;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && typeof onChange === 'function') {
      if (type === 'tel') {
        const value = event.target.value;
        const cleanValue =
          (value.charAt(0) === '+' ? '+' : '') +
          value
            .slice(value.charAt(0) === '+' ? 1 : 0)
            .replace(/[^0-9]/g, '')
            .slice(0, 12);
        event.target.value = cleanValue;
      }
      onChange(event);
    }
    if (getFieldState(name)?.invalid && !event.target.value) {
      setIsFocused(false);
      return;
    }
    setIsFocused(true);
  };

  React.useEffect(() => {
    if (!formValue) {
      setIsValid(false);
    } else {
      setIsValid(true);
      setIsFocused(true);
    }
  }, [formValue]);

  return (
    <StyledInputWithCheckmark
      checkmarkStatus={isValid ? 'valid' : isFocused ? 'focused' : 'neutral'}>
      <Label
        isFocused={isFocused || false}
        isErrored={!!formState.errors[name]?.message}>
        {label}
      </Label>

      <InputField
        {...restRegister}
        type={type}
        isErrored={!!formState.errors[name]?.message}
        onFocus={() => setIsFocused(true)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <ErrorMessage
        name={name}
        errors={formState.errors}
        render={({ message }) => (
          <StyledErrorMessage>{message}</StyledErrorMessage>
        )}
      />
    </StyledInputWithCheckmark>
  );
};

export default FormTextInput;
