import React from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

const InputContainer = styled.div`
  position: relative;
  margin: 15px 0;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px 10px 10px 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -20px;
    left: 0;
    font-size: 12px;
    color: blue;
  }
`;

const Label = styled.label<{ isFocused: boolean }>`
  position: absolute;
  top: ${(props) => (props.isFocused ? "-20px" : "10px")};
  left: 5px;
  font-size: ${(props) => (props.isFocused ? "12px" : "16px")};
  color: ${(props) => (props.isFocused ? "blue" : "#999")};
  transition: all 0.3s ease;
  pointer-events: none;
`;

const Checkmark = styled.svg<{ isFocused: boolean; isValid?: boolean }>`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  fill: ${(props) =>
    props.isValid ? "green" : props.isFocused ? "lightgreen" : "grey"};
`;

interface StyledInputProps {
  label: string;
  name: string;
}

const FormInput: React.FC<StyledInputProps> = ({ label, name }) => {
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
    <InputContainer>
      <Label isFocused={isFocused || false}>{label}</Label>
      <InputField
        {...restRegister}
        onFocus={() => setIsFocused(true)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Checkmark
        isFocused={isFocused || false}
        isValid={!getFieldState(name)?.invalid}
        viewBox='0 0 24 24'>
        <svg
          width='17'
          height='17'
          viewBox='0 0 17 17'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M16.2576 1.10648C15.4905 0.693412 14.6348 1.49004 14.1333 1.96212C12.9826 3.0833 12.009 4.38152 10.9172 5.56171C9.70754 6.85992 8.58636 8.15814 7.34715 9.4269C6.63904 10.135 5.87191 10.9021 5.39984 11.7873C4.33766 10.7546 3.42301 9.63338 2.24282 8.71878C1.38718 8.06967 -0.0290511 7.59759 0.000453759 9.16135C0.0594634 11.1972 1.85926 13.3806 3.18697 14.7673C3.74757 15.3574 4.48519 15.977 5.34083 16.0065C6.3735 16.0655 7.43567 14.8263 8.05527 14.1477C9.147 12.9675 10.0321 11.6397 11.0353 10.4301C12.3335 8.8368 13.6612 7.27299 14.9299 5.65023C15.7265 4.64706 18.2344 2.16861 16.2576 1.10648ZM1.29862 9.04333C1.26911 9.04333 1.23961 9.04333 1.1806 9.07279C1.06258 9.04333 0.974065 9.01378 0.856045 8.95477C0.94456 8.89576 1.09208 8.92526 1.29862 9.04333Z'
            fill='#1FBEC9'
          />
        </svg>
      </Checkmark>
    </InputContainer>
  );
};

export default FormInput;
