import React, { PropsWithChildren } from 'react';

import styled from 'styled-components';

import { CheckmarkStatus } from '../../interfaces';

interface StyledInputWithCheckmarkProps {
  checkmarkStatus?: CheckmarkStatus;
  onCheckmarkClick?: () => void;
}

const InputRow = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Checkmark = styled.svg<
  StyledInputWithCheckmarkProps & { isClickable?: boolean }
>`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  fill: ${({ checkmarkStatus, theme }) =>
    checkmarkStatus === 'valid'
      ? theme.color.main
      : checkmarkStatus === 'focused'
        ? theme.color.mainLight
        : theme.color.grey};
  transition: all 0.3s ease;
  &:hover {
    cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'auto')};
  }
`;

const StyledInputWithCheckmark: React.FC<
  PropsWithChildren<StyledInputWithCheckmarkProps>
> = ({
  checkmarkStatus = 'neutral',
  onCheckmarkClick = undefined,
  children,
}) => {
  return (
    <InputRow>
      <Checkmark
        checkmarkStatus={checkmarkStatus}
        width='25'
        height='25'
        viewBox='0 0 26 26'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        isClickable={!!onCheckmarkClick}
        onClick={onCheckmarkClick}>
        <g clipPath='url(#clip0_162_978)'>
          <path d='M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25Z' />
          <path
            d='M6.5 11.84L10.97 16.16L18.5 8.84'
            stroke='white'
            strokeWidth='2.5'
            strokeMiterlimit='10'
          />
        </g>
        <defs>
          <clipPath id='clip0_162_978'>
            <rect width='25' height='25' fill='white' />
          </clipPath>
        </defs>
      </Checkmark>
      <InputContainer>{children}</InputContainer>
    </InputRow>
  );
};

export default StyledInputWithCheckmark;
