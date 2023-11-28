import React from "react";

import { useStateMachine } from "little-state-machine";
import * as actions from "../../store/actions";
import StepOneForm from "./StepOneForm/StepOneForm";
import StepTwoForm from "./StepTwoForm/StepTwoForm";
import Stepper from "../Stepper/Stepper";
import styled from "styled-components";

const WrapperContainer = styled.div`
  position: relative;
  max-width: 500px;
  padding-bottom: 4.75rem;
`;
const Form: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<1 | 2>(1);
  const { actions: stateActions, state } = useStateMachine({ ...actions });

  const onSubmit = (step: number) => () => {
    if (step === 1) {
      setCurrentStep(2);
      return;
    }
    // TODO: send data to server with { ...state.formData.formDataStepOne, ...state.formData.formDataStepTwo }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <WrapperContainer>
      {currentStep === 1 && (
        <StepOneForm
          initialValues={state?.formData?.formDataStepOne}
          handleUpdate={stateActions.updateForm}
          handleSubmit={onSubmit(1)}
        />
      )}
      {currentStep === 2 && (
        <StepTwoForm
          initialValues={state?.formData?.formDataStepTwo}
          handleUpdate={stateActions.updateForm}
          userAge={state?.formData?.formDataStepOne?.dateOfBirth}
          handleBack={handleBack}
          handleSubmit={onSubmit(2)}
        />
      )}
      <Stepper current={currentStep - 1} />
    </WrapperContainer>
  );
};

export default Form;
