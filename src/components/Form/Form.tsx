import React, { Suspense } from 'react';

import { Alert } from 'antd';
import { useStateMachine } from 'little-state-machine';
import styled from 'styled-components';

import {
  useProductVariationOptions,
  useUserInitialValues,
} from '../../api/actions/get.actions';
import {
  useCheckUserEmail,
  usePostFormData,
} from '../../api/actions/post.actions';
import { startSession } from '../../api/services/axiosService';
import { ProductVariationsRequestBody, StepOneValues } from '../../interfaces';
import { STRINGS } from '../../language';
import * as actions from '../../store/actions';
import { Typography } from '../../theme/styles';
import { formatDate } from '../../utils/dateFormatter';
import Loader from '../Loader/Loader';
import Stepper from '../Stepper/Stepper';
import WarningAlert from '../WarningAlert/WarningAlert';

const Container = styled.div`
  position: relative;
  height: inherit;
  width: inherit;
`;

const AlertWrapper = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
  position: absolute;
  width: 100%;

  .ant-alert {
    width: 100%;
  }

  button[type='button'].ant-alert-close-icon {
    min-height: 1rem;
  }
`;

const TypographyWrapper = styled.div`
  padding: 0.5rem 2rem;
`;
const StyledHeader = styled.h1<{
  $align?: React.CSSProperties['alignSelf'];
  $padded?: boolean;
}>`
  ${Typography.HeadingOne};
  align-self: ${({ $align }) => $align || 'flex-start'};
  ${({ $align }) =>
    $align && $align === 'center' ? 'text-align: center;' : ''}
  span {
    color: ${(props) => props.theme.color.main};
  }
  padding: ${({ $padded = false }) => ($padded ? '3rem' : '0')};
`;

const StyledParagraph = styled.p`
  ${Typography.Paragraph};
  margin-bottom: 0;
  padding-bottom: 0;
`;

const StepOneForm = React.lazy(() => import('./StepOneForm/StepOneForm'));
const StepTwoForm = React.lazy(() => import('./StepTwoForm/StepTwoForm'));
const SuccessMessage = React.lazy(
  () => import('../SuccessMessage/SuccessMessage')
);

const Form: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const stepOneInitialValues = useUserInitialValues();
  const stepTwoInitialValues = useProductVariationOptions();
  const submitFormCallback = usePostFormData();

  const {
    actions: stateActions,
    state: { formData, isLoading, isError, isWarning, warningCode },
  } = useStateMachine({ ...actions });

  const handleSetStep = (step: number) => () => setCurrentStep(step);

  const handleStepOneSubmit = useCheckUserEmail();

  const handleStepTwoSubmit = async (body: ProductVariationsRequestBody) => {
    const { formDataStepOne } = formData;
    return await submitFormCallback({
      ...body,
      ...(formDataStepOne as StepOneValues),
      dateOfBirth: formatDate(formDataStepOne?.dateOfBirth ?? null),
    });
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAlertAfterClose = () => {
    stateActions.updateStore({
      isError: false,
      isWarning: false,
      warningCode: '',
    });
  };

  React.useEffect(() => {
    const generateSessionToken = async (): Promise<void> => {
      if (!localStorage.getItem('token')) {
        await startSession();
      }
    };
    generateSessionToken();
  }, []);

  React.useEffect(() => {
    if (stepOneInitialValues) {
      stateActions.updateStore({
        formDataStepOne: {
          ...stepOneInitialValues,
        },
      });
    }

    return () => {
      stateActions.updateStore({
        isError: false,
        isLoading: false,
        isWarning: false,
        warningCode: '',
      });
    };
  }, [stepOneInitialValues, stateActions]);

  return (
    <Container>
      <Suspense fallback={<Loader />}>
        {isWarning && (
          <WarningAlert
            code={warningCode}
            handleAfterClose={handleAlertAfterClose}
          />
        )}
        {isError && (
          <AlertWrapper>
            <Alert
              message={STRINGS.ERROR.TITLE}
              description={STRINGS.ERROR.SUBTITLE}
              type='error'
              closable
              afterClose={handleAlertAfterClose}
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
              handleSubmit={handleStepOneSubmit}
            />
          </>
        )}
        {currentStep === 2 && !isLoading && (
          <>
            <StyledHeader $align='center' $padded>
              {STRINGS.STEP_TWO_TITLE}
            </StyledHeader>
            <StepTwoForm
              handleUpdate={stateActions.updateStore}
              options={stepTwoInitialValues?.options}
              userAge={formData?.formDataStepOne?.dateOfBirth}
              setStep={handleSetStep(3)}
              handleBack={handleBack}
              handleSubmit={handleStepTwoSubmit}
            />
          </>
        )}
        {currentStep === 3 && !isLoading && <SuccessMessage />}
      </Suspense>
      <Stepper current={currentStep - 1} />
    </Container>
  );
};

export default Form;
