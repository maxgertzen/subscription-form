import React from 'react';
import styled from 'styled-components';

const StyledRedMessage = styled.p`
  position: absolute;
  color: ${({ theme }) => theme.color.red};
  font-family: ${(props) => props.theme.fontFamily.main};
  font-size: 0.6rem;
  bottom: -1.5rem;
`;

export const StyledErrorMessage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <StyledRedMessage>{children}</StyledRedMessage>;
};
