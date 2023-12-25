import React from 'react';

import styled from 'styled-components';

interface VerticalSpacingProps {
  units?: number;
}

const StyledVerticalSpacing = styled.div<VerticalSpacingProps>`
  height: ${({ units }) => `${units}rem`};
`;

export const VerticalSpacing: React.FC<VerticalSpacingProps> = ({
  units = 0.5,
}) => {
  return <StyledVerticalSpacing units={units} />;
};

export default VerticalSpacing;
