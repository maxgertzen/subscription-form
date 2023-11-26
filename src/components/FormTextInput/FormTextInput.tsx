import React from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import StyledInputWithCheckmark from "../StyledInputWithCheckmark/StyledInputWithCheckmark";

interface StyledInputWithCheckmarkProps {
  label: string;
  name: string;
  type?: "text" | "tel" | "email";
}

const InputField = styled.input`
  width: 100%;
  padding: 10px 0;
  border: unset;
  border-bottom: 1px solid #ccc;
  outline: none;
  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -20px;
    right: 0;
    font-size: 12px;
    color: blue;
  }
`;

const Label = styled.label<{ isFocused: boolean }>`
  position: absolute;
  top: ${(props) => (props.isFocused ? "-20px" : "10px")};
  right: 5px;
  font-size: ${(props) => (props.isFocused ? "12px" : "16px")};
  color: ${(props) => (props.isFocused ? "blue" : "#999")};
  transition: all 0.3s ease;
  pointer-events: none;
`;

const FormTextInput: React.FC<StyledInputWithCheckmarkProps> = ({
  label,
  name,
  type = "text",
}) => {
  const { register, getFieldState } = useFormContext();
  const [isFocused, setIsFocused] = React.useState(false);

  const { onBlur, onChange, ...restRegister } = register(name);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur && typeof onBlur === "function") {
      onBlur(event);
    }
    if (getFieldState(name)?.invalid || !event.target.value) {
      setIsFocused(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && typeof onChange === "function") {
      onChange(event);
    }
    if (getFieldState(name)?.invalid) {
      setIsFocused(false);
      return;
    }
    setIsFocused(true);
  };

  return (
    <StyledInputWithCheckmark
      checkmarkStatus={
        (getFieldState(name)?.invalid && getFieldState(name)?.isDirty) ||
        isFocused
          ? "focused"
          : !getFieldState(name)?.invalid
          ? "valid"
          : "neutral"
      }>
      <Label isFocused={isFocused || false}>{label}</Label>

      <InputField
        {...restRegister}
        type={type}
        onFocus={() => setIsFocused(true)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </StyledInputWithCheckmark>
  );
};

export default FormTextInput;
