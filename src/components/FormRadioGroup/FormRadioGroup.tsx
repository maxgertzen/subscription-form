import React from "react";
import styled from "styled-components";
import { useFormContext, Controller } from "react-hook-form";
import { RadioButtonValue, StepTwoValues } from "../../interfaces";
import { SharedTypographyStyles } from "../../theme/styles/StyledTypography";

const StyledButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto 1rem;
  max-width: 320px;
  gap: 0.5rem;
`;

const RadioButtonLabel = styled.label<{
  checked: boolean;
}>`
  ${SharedTypographyStyles}
  display: inline-flex;
  width: 97px;
  height: 97px;
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
`;

const RadioButtonInput = styled.input`
  display: none; // Hide the actual input
`;

interface FormRadioButtonGroupProps {
  options: RadioButtonValue[];
  userAge?: number;
  children?: React.ReactNode;
}

const FormRadioButtonGroup: React.FC<FormRadioButtonGroupProps> = ({
  userAge = 100,
  options,
  children,
}) => {
  const { control, watch } = useFormContext<StepTwoValues>();
  const selectedValue = watch("selectedAmount");

  const handleRadioClick = (
    option: RadioButtonValue,
    selectedValue: RadioButtonValue | null,
    onChange: (value: RadioButtonValue | null) => void
  ) => {
    onChange(selectedValue?.value === option?.value ? null : option);
  };

  return (
    <StyledButtonGroup>
      {options.map((option, index) => {
        if (userAge > 25 && option?.value === "25") return null;
        return (
          <Controller
            key={option?.value}
            name='selectedAmount'
            control={control}
            render={({ field }) => (
              <>
                <RadioButtonLabel
                  checked={selectedValue?.value === option?.value}
                  htmlFor={`radio-button-${index + 1}`}
                  onClick={() =>
                    handleRadioClick(option, selectedValue, field.onChange)
                  }>
                  {option?.label}
                </RadioButtonLabel>
                <RadioButtonInput
                  type='radio'
                  {...field}
                  value={option?.value}
                  checked={selectedValue?.value === option?.value}
                  id={`radio-button-${index + 1}`}
                />
              </>
            )}
          />
        );
      })}
      {children}
    </StyledButtonGroup>
  );
};

export default FormRadioButtonGroup;
