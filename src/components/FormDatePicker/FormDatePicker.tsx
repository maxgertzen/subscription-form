import React from "react";
import styled from "styled-components";
import { useFormContext, Controller } from "react-hook-form";
import StyledInputWithCheckmark from "../../theme/styles/StyledInputWithCheckmark";
import { DatePicker } from "antd";
import { StepOneValues } from "../../interfaces";
import * as dayjs from "dayjs";
import { SharedTypographyStyles } from "../../theme/styles/StyledTypography";

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
  top: ${(props) => (props.isFocused ? "-20px" : "10px")};
  right: 5px;
  font-size: ${(props) => (props.isFocused ? "12px" : "16px")};
  color: ${({ isFocused, theme }) =>
    isFocused ? theme.color.grey : theme.color.black};
  transition: all 0.3s ease;
  z-index: 1;
`;

const FormDatePicker: React.FC<StyledInputWithCheckmarkProps> = ({ label }) => {
  const { control, getValues, getFieldState, setValue } =
    useFormContext<StepOneValues>();
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    const value = getValues("dateOfBirth");
    if (!value) {
      setIsFocused(false);
    }
  };

  return (
    <StyledInputWithCheckmark
      checkmarkStatus={
        (getFieldState("dateOfBirth")?.invalid &&
          getFieldState("dateOfBirth")?.isDirty) ||
        isFocused
          ? "focused"
          : !getFieldState("dateOfBirth")?.invalid
          ? "valid"
          : "neutral"
      }>
      <Label isFocused={isFocused}>{label}</Label>
      <DatePickerWrapper>
        <Controller
          control={control}
          name='dateOfBirth'
          render={({ field: { value, onChange, ...restField } }) => (
            <DatePicker
              {...restField}
              value={value && dayjs(value)}
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
                onChange();
                if (date !== null)
                  setValue("dateOfBirth", dayjs(date).toDate());
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
