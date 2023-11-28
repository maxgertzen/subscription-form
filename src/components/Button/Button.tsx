import React from "react";
import styled from "styled-components";

const StyledButton = styled.input<{ isPrimary: boolean }>`
  width: 100%;
  padding: 10px 5px;
  max-height: 38px;
  border-radius: 60px;
  background: ${({ disabled, isPrimary, theme }) =>
    disabled
      ? theme.color.grey
      : isPrimary
      ? theme.color.main
      : theme.color.black};
  text-align: center;
  color: ${({ disabled, isPrimary, theme }) =>
    disabled
      ? theme.color.white
      : isPrimary
      ? theme.color.white
      : theme.color.black};
  border: none;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  &[disabled="false"]:hover {
    background: ${({ isPrimary, theme }) =>
      isPrimary ? theme.color.mainLight : theme.color.black};
    color: white;
    cursor: pointer;
  }
`;

interface ButtonProps {
  label: string;
  type?: "submit" | "button";
  disabled?: boolean;
  handleClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = "submit",
  disabled = false,
  handleClick,
}) => {
  return (
    <StyledButton
      disabled={disabled}
      isPrimary={type === "submit"}
      type={type}
      value={label}
      onClick={handleClick}
    />
  );
};

export default Button;
