import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Typography } from '../../theme/styles';
import ExclamationTriangleIcon from '../../assets/exclamation-triangle-line-icon.svg?react';
import { STRINGS } from '../../language';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: inherit;
`;

const StyledTitle = styled.h2`
  ${Typography.HeadingThree};
`;

const StyledSubtitle = styled.p`
  ${Typography.Paragraph}
`;

const SvgContainer = styled.div`
  margin: 1.5rem 0;
  max-width: 160px;
`;

const ErrorMessage: React.FC = () => {
  const theme = useTheme();
  return (
    <ErrorContainer>
      <StyledTitle>{STRINGS.ERROR.TITLE}</StyledTitle>
      <StyledSubtitle>{STRINGS.ERROR.SUBTITLE}</StyledSubtitle>
      <SvgContainer>
        <ExclamationTriangleIcon fill={theme.color.main} />
      </SvgContainer>
      <StyledSubtitle>
        {STRINGS.ERROR.CONTACT_US}
        <a
          href='https://radical.org.il/contact/'
          target='_blank'
          rel='noopener noreferrer'>
          {STRINGS.ERROR.LINK}
        </a>
      </StyledSubtitle>
    </ErrorContainer>
  );
};

export default ErrorMessage;
