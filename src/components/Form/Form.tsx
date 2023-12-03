import React from 'react';

import { useStateMachine } from 'little-state-machine';
import * as actions from '../../store/actions';
import StepOneForm from './StepOneForm/StepOneForm';
import StepTwoForm from './StepTwoForm/StepTwoForm';
import Stepper from '../Stepper/Stepper';
import styled from 'styled-components';
import { Typography, VerticalSpacing } from '../../theme/styles';
import { STRINGS } from '../../language';
import { convertToDate } from '../../utils/dateFormatter';
import Loader from '../Loader/Loader';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import { Alert } from 'antd';
import {
  useProductVariationOptions,
  useUserInitialValues,
} from '../../api/actions/getData.actions';
import {
  usePostProductVariation,
  usePostUserData,
} from '../../api/actions/postData.actions';

const Container = styled.div`
  position: relative;
  height: inherit;
  width: inherit;
`;

const AlertWrapper = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
  position: absolute;
  width: calc(100% - 1rem);

  .ant-alert {
    width: 100%;
  }
`;

const TypographyWrapper = styled.div`
  padding: 0.5rem 2rem;
`;
const StyledHeader = styled.h1<{ align?: React.CSSProperties['alignSelf'] }>`
  ${Typography.HeadingOne};
  align-self: ${({ align }) => align || 'flex-start'};
  span {
    color: ${(props) => props.theme.color.main};
  }
`;

const StyledParagraph = styled.p`
  ${Typography.Paragraph};
  margin-bottom: 0;
  padding-bottom: 0;
`;

const Form: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const stepOneInitialValues = useUserInitialValues();
  const stepTwoInitialValues = useProductVariationOptions();

  const updateUserCallback = usePostUserData();
  const updateProductSelectionCallback = usePostProductVariation();

  const {
    actions: stateActions,
    state: { formData, isLoading, isError },
  } = useStateMachine({ ...actions });

  const handleSetStep = (step: number) => () => setCurrentStep(step);

  const handleStepOneSubmit = () => updateUserCallback;

  const handleStepTwoSubmit = () => updateProductSelectionCallback;

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  React.useEffect(() => {
    stateActions.updateStore({
      formDataStepOne: {
        ...stepOneInitialValues,
        dateOfBirth: convertToDate(stepOneInitialValues?.dateOfBirth),
      },
    });
  }, [stepOneInitialValues, stateActions]);

  return (
    <Container>
      {isError && (
        <AlertWrapper>
          <Alert
            message={STRINGS.ERROR.TITLE}
            description={STRINGS.ERROR.SUBTITLE}
            type='error'
            closable
          />
        </AlertWrapper>
      )}
      {isLoading && <Loader />}
      {currentStep === 1 && !isLoading && (
        <>
          <TypographyWrapper>
            <StyledHeader>
              {STRINGS.STEP_ONE_TITLE.START}
              <span>{STRINGS.STEP_ONE_TITLE.END}</span>
            </StyledHeader>
            <StyledParagraph>
              {STRINGS.STEP_ONE_SUBTITLE.START}
              <strong>{STRINGS.STEP_ONE_SUBTITLE.END}</strong>
            </StyledParagraph>
          </TypographyWrapper>
          <StepOneForm
            initialValues={formData?.formDataStepOne}
            setStep={handleSetStep(2)}
            handleUpdate={stateActions.updateStore}
            handleSubmit={handleStepOneSubmit()}
          />
        </>
      )}
      {currentStep === 2 && !isLoading && (
        <>
          <VerticalSpacing units={3} />
          <StyledHeader align='center'>{STRINGS.STEP_TWO_TITLE}</StyledHeader>
          <StepTwoForm
            handleUpdate={stateActions.updateStore}
            options={stepTwoInitialValues?.options}
            userAge={formData?.formDataStepOne?.dateOfBirth}
            setStep={handleSetStep(3)}
            handleBack={handleBack}
            handleSubmit={handleStepTwoSubmit()}
          />
        </>
      )}
      {currentStep === 3 && !isLoading && <SuccessMessage />}
      <Stepper current={currentStep - 1} />
    </Container>
  );
};

export default Form;
