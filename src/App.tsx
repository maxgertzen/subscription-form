import React, { Suspense } from "react";
import { StateMachineProvider } from "little-state-machine";
import Form from "./components/Form/Form";
import Loader from "./components/Loader/Loader";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

const App: React.FC = () => {
  return (
    <StateMachineProvider>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loader />}>
          <Form />
        </Suspense>
      </ThemeProvider>
    </StateMachineProvider>
  );
};

export default App;
