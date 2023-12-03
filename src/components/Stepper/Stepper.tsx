import React from 'react';

import { Steps } from 'antd';
import styled from 'styled-components';
import { STRINGS } from '../../language';

interface StepperProps {
  current: number;
}

const StyledSteps = styled(Steps)`
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 1.5rem 0.75rem 0.5rem;
  background-color: ${(props) => props.theme.color.secondary};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  .ant-steps-item-wait {
    .ant-steps-item-icon {
      background-color: ${(props) => props.theme.color.secondary};
      border-color: ${(props) => props.theme.color.white};
      .ant-steps-icon {
        color: ${(props) => props.theme.color.white};
      }
    }
  }

  .ant-steps-item-finish {
    .ant-steps-item-icon {
      background-color: ${(props) => props.theme.color.secondary};
      border-color: ${(props) => props.theme.color.white};
      .ant-steps-icon {
        color: ${(props) => props.theme.color.white};
      }
    }
  }
  .ant-steps-item-active {
    .ant-steps-item-icon {
      background-color: ${(props) => props.theme.color.white};
      border-color: ${(props) => props.theme.color.white};
      .ant-steps-icon {
        color: ${(props) => props.theme.color.secondary};
      }
    }
  }
  .ant-steps-item-title {
    font-size: 0.75rem;
    color: ${(props) => props.theme.color.white} !important;
  }

  .ant-steps-item-tail::after {
    background-color: ${(props) => props.theme.color.white} !important;
  }
`;

const Stepper: React.FC<StepperProps> = ({ current }) => {
  return (
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
  );
};

export default Stepper;
