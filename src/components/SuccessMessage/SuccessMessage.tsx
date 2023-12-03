import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Typography, VerticalSpacing } from '../../theme/styles';
import { STRINGS } from '../../language';
import PartyHatIcon from '../../assets/party-hat-icon.svg?react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: inherit;

  svg {
    margin: 1.5rem 0;
    max-width: 160px;
  }
`;

const StyledTitle = styled.h2`
  ${Typography.HeadingThree};
`;

const StyledSubtitle = styled.p`
  ${Typography.Paragraph}
`;

const SuccessMessage: React.FC = () => {
  const theme = useTheme();
  React.useEffect(() => {
    const navigator = setTimeout(() => {
      window.location.href = 'https://radical.org.il/checkout';
    }, 3000);

    return () => {
      clearTimeout(navigator);
    };
  }, []);
  return (
    <Container>
      <StyledTitle>{STRINGS.SUCCESS.TITLE}</StyledTitle>
      <StyledSubtitle>{STRINGS.SUCCESS.SUBTITLE}</StyledSubtitle>
      <PartyHatIcon fill={theme.color.main} />
      <VerticalSpacing units={4} />
    </Container>
  );
};

export default SuccessMessage;
