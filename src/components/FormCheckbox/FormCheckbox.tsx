import React from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import StyledInputWithCheckmark from "../StyledInputWithCheckmark/StyledInputWithCheckmark";

interface FormCheckboxProps {
  label: string;
  name: string;
}

const Checkbox = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormCheckbox: React.FC<FormCheckboxProps> = ({ label, name }) => {
  const { register, watch, setValue } = useFormContext();
  const isChecked = watch(name);

  const handleCheckmarkClick = () => {
    setValue(name, !isChecked);
  };

  return (
    <StyledInputWithCheckmark
      checkmarkStatus={isChecked ? "valid" : "neutral"}
      onCheckmarkClick={handleCheckmarkClick}>
      <CheckboxLabel>
        <Checkbox type='checkbox' {...register(name)} />
        {label}
      </CheckboxLabel>
    </StyledInputWithCheckmark>
  );
};

export default FormCheckbox;
