import React from "react";
import styled from "styled-components";
import { useFormContext, Controller } from "react-hook-form";
import StyledInputWithCheckmark from "../StyledInputWithCheckmark/StyledInputWithCheckmark";
import { DatePicker } from "antd";

interface StyledInputWithCheckmarkProps {
  label: string;
  name: string;
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
  position: absolute;
  top: ${(props) => (props.isFocused ? "-20px" : "10px")};
  right: 5px;
  font-size: ${(props) => (props.isFocused ? "12px" : "16px")};
  color: ${(props) => (props.isFocused ? "blue" : "#999")};
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 1;
`;

const FormDatePicker: React.FC<StyledInputWithCheckmarkProps> = ({
  label,
  name,
}) => {
  const { control, getValues, getFieldState } = useFormContext();
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    const value = getValues(name);
    if (!value) {
      setIsFocused(false);
    }
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
      <Label isFocused={isFocused}>{label}</Label>
      <DatePickerWrapper>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <DatePicker
              {...field}
              allowClear={false}
              placeholder=' '
              format='DD/MM/YYYY'
              picker='date'
              style={{
                width: "100%",
                borderLeft: "none",
                borderRight: "none",
                borderTop: "none",
                borderRadius: 0,
                borderBottom: "1px solid #ccc",
                padding: "10px 5px",
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(date, dateString) => {
                field.onChange(date);
                if (dateString === "") {
                  setIsFocused(false);
                }
              }}
            />
          )}
        />
      </DatePickerWrapper>
    </StyledInputWithCheckmark>
  );
};

export default FormDatePicker;
