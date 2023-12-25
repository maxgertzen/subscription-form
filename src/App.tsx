import './store/store';

import React from 'react';

import { StateMachineProvider } from 'little-state-machine';
import { ThemeProvider } from 'styled-components';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Form from './components/Form/Form';
import theme from './theme';
import { StyledFormWrapper } from './theme/styles';

const App: React.FC = () => {
  return (
    <StateMachineProvider>
      <ThemeProvider theme={theme}>
        <StyledFormWrapper>
          <ErrorBoundary fallback={<ErrorMessage />}>
            <Form />
          </ErrorBoundary>
        </StyledFormWrapper>
      </ThemeProvider>
    </StateMachineProvider>
  );
};

export default App;
