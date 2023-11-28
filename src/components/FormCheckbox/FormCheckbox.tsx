import React from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import StyledInputWithCheckmark from "../../theme/styles/StyledInputWithCheckmark";
import { StepOneValues } from "../../interfaces";

interface FormCheckboxProps {
  label: string;
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

const FormCheckbox: React.FC<FormCheckboxProps> = ({ label }) => {
  const { register, watch, setValue } = useFormContext<StepOneValues>();
  const isChecked = watch("checkbox");

  const handleCheckmarkClick = () => {
    setValue("checkbox", !isChecked);
  };

  return (
    <StyledInputWithCheckmark
      checkmarkStatus={isChecked ? "valid" : "neutral"}
      onCheckmarkClick={handleCheckmarkClick}>
      <CheckboxLabel>
        <Checkbox type='checkbox' {...register("checkbox")} />
        {label}
      </CheckboxLabel>
    </StyledInputWithCheckmark>
  );
};

export default FormCheckbox;
