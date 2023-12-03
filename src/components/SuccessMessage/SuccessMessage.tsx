import React from 'react';
import styled from 'styled-components';
import { Typography } from '../../theme/styles';
import { STRINGS } from '../../language';

const StyledTitle = styled.h2`
  ${Typography.HeadingThree};
`;

const StyledSubtitle = styled.p`
  ${Typography.Paragraph}
`;

const SuccessMessage: React.FC = () => {
  React.useEffect(() => {
    const navigator = setTimeout(() => {
      window.location.href = 'https://radical.org.il/checkout';
    }, 3000);

    return () => {
      clearTimeout(navigator);
    };
  }, []);
  return (
    <>
      <StyledTitle>{STRINGS.SUCCESS.TITLE}</StyledTitle>
      <StyledSubtitle>{STRINGS.SUCCESS.SUBTITLE}</StyledSubtitle>
    </>
  );
};

export default SuccessMessage;
