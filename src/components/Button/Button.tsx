import React from 'react';

import styled from 'styled-components';

const StyledButton = styled.input<{ primary: boolean }>`
  font-family: ${({ theme }) => theme.fontFamily.main};
  font-size: 1rem;
  width: 100%;
  padding: 10px 5px;
  max-height: 38px;
  border-radius: 60px;
  background: ${({ disabled, primary, theme }) =>
    disabled
      ? theme.color.grey
      : primary
        ? theme.color.main
        : theme.color.white};
  text-align: center;
  color: ${({ theme, primary }) =>
    primary ? theme.color.white : theme.color.black};
  border: ${({ theme, primary }) =>
    primary ? 'none' : `1px solid ${theme.color.black}`};
  transition: all 0.3s ease;
  margin: 0.5rem 0;
  &:not([disabled]):hover {
    background: ${({ primary, theme }) =>
      primary ? theme.color.mainLight : theme.color.black};
    color: ${({ primary, theme }) =>
      primary ? theme.color.white : theme.color.white};
    cursor: pointer;
  }
`;

interface ButtonProps {
  label: string;
  type?: 'submit' | 'button';
  disabled?: boolean;
  handleClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = 'submit',
  disabled = false,
  handleClick,
}) => {
  return (
    <StyledButton
      disabled={disabled}
      primary={type === 'submit'}
      type={type}
      value={label}
      onClick={handleClick}
    />
  );
};

export default Button;
