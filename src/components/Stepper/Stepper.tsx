import React from "react";

import { Steps } from "antd";
import styled from "styled-components";
import { STRINGS } from "../../language";

interface StepperProps {
  current: number;
}

const StepsContainer = styled.div`
  width: 100%;
  background-color: #201a58;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const StyledSteps = styled(Steps)`
  .ant-steps-item-wait {
    color: #ffefe3;
    background-color: #201a58;
  }

  .ant-steps-item-finish {
    color: #ffefe3;
    background-color: #201a58;
  }
  .ant-steps-item-active {
    color: #201a58;
    background-color: #ffefe3;
  }
  .ant-steps-item-title {
    font-size: 1.5rem;
    color: #ffefe3;
  }

  .ant-steps-item-tail::after {
    background-color: #ffefe3;
  }
`;

const Stepper: React.FC<StepperProps> = ({ current }) => {
  return (
    <StepsContainer>
      <StyledSteps
        current={current}
        items={[
          {
            title: STRINGS.STEPS.FIRST,
          },
          {
            title: STRINGS.STEPS.SECOND,
          },
          {
            title: STRINGS.STEPS.THIRD,
          },
        ]}
        labelPlacement='vertical'
      />
    </StepsContainer>
  );
};

export default Stepper;
