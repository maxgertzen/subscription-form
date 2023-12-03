import React from 'react';
import styled from 'styled-components';

const StyledRedMessage = styled.p<{ isCentered: boolean }>`
  ${({ isCentered }) =>
    isCentered
      ? 'text-align: center; margin: 0;'
      : 'position: absolute; bottom: -1.5rem;'}
  color: ${({ theme }) => theme.color.red};
  font-family: ${(props) => props.theme.fontFamily.main};
  font-size: 0.6rem;
`;

export const StyledErrorMessage: React.FC<{
  isCentered?: boolean;
  children: React.ReactNode;
}> = ({ isCentered = false, children }) => {
  return (
    <StyledRedMessage isCentered={isCentered}>{children}</StyledRedMessage>
  );
};
