import React from 'react';
import { StateMachineProvider } from 'little-state-machine';
import Form from './components/Form/Form';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import './store/store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { StyledFormWrapper } from './theme/styles';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

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
