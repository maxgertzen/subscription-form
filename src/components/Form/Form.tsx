import React from 'react';

import { useStateMachine } from 'little-state-machine';
import * as actions from '../../store/actions';
import StepOneForm from './StepOneForm/StepOneForm';
import StepTwoForm from './StepTwoForm/StepTwoForm';
import Stepper from '../Stepper/Stepper';
import styled from 'styled-components';
import {
  Typography,
  VerticalSpacing,
  StyledFormWrapper,
} from '../../theme/styles';
import { STRINGS } from '../../language';

const StyledHeader = styled.h1<{ align?: React.CSSProperties['alignSelf'] }>`
  ${Typography.HeadingOne};
  align-self: ${({ align }) => align || 'flex-start'};
  span {
    color: ${(props) => props.theme.color.main};
  }
`;

const StyledParagraph = styled.p`
  ${Typography.Paragraph};
  margin-bottom: 1.5rem;
`;

const Form: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<1 | 2>(2);
  const { actions: stateActions, state } = useStateMachine({ ...actions });

  const onSubmit = (step: number) => () => {
    if (step === 1) {
      setCurrentStep(2);
      return;
    }
    console.log(state?.formData);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <StyledFormWrapper>
      {currentStep === 1 && (
        <>
          <StyledHeader>
            {STRINGS.STEP_ONE_TITLE.START}
            <span>{STRINGS.STEP_ONE_TITLE.END}</span>
          </StyledHeader>
          <StyledParagraph>
            {STRINGS.STEP_ONE_SUBTITLE.START}
            <strong>{STRINGS.STEP_ONE_SUBTITLE.END}</strong>
          </StyledParagraph>
          <StepOneForm
            initialValues={state?.formData?.formDataStepOne}
            handleUpdate={stateActions.updateForm}
            handleSubmit={onSubmit(1)}
          />
        </>
      )}
      {currentStep === 2 && (
        <>
          <VerticalSpacing units={3} />
          <StyledHeader align='center'>{STRINGS.STEP_TWO_TITLE}</StyledHeader>
          <VerticalSpacing units={2} />
          <StepTwoForm
            initialValues={state?.formData?.formDataStepTwo}
            handleUpdate={stateActions.updateForm}
            userAge={state?.formData?.formDataStepOne?.dateOfBirth}
            handleBack={handleBack}
            handleSubmit={onSubmit(2)}
          />
        </>
      )}
      <Stepper current={currentStep - 1} />
    </StyledFormWrapper>
  );
};

export default Form;
