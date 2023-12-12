import React from 'react';

import { Alert } from 'antd';

import styled from 'styled-components';
import { STRINGS } from '../../language';
import { Typography } from '../../theme/styles';

const AlertWrapper = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
  position: absolute;
  width: calc(100% - 1rem);

  .ant-alert {
    z-index: 1;
    width: 100%;
  }
`;

const Paragraph = styled.p`
  ${Typography.Paragraph}
  &:first-child {
    margin-bottom: 0.5rem;
  }
`;

interface WarningAlertProps {
  code: 'existing_subscriber' | 'not_logged_in' | string;
  handleAfterClose: () => void;
}

const WarningAlert: React.FC<WarningAlertProps> = ({
  code,
  handleAfterClose,
}) => {
  const messages = React.useMemo(() => {
    switch (code) {
      case 'existing_subscriber':
        return {
          message: STRINGS.WARNING_ALERT.EXISTING_SUBSCRIBER.TITLE,
          description: (
            <div>
              <Paragraph>
                {STRINGS.WARNING_ALERT.EXISTING_SUBSCRIBER.SUBTITLE}{' '}
                <a href='https://radical.org.il/my-account/edit-account/'>
                  {STRINGS.WARNING_ALERT.EXISTING_SUBSCRIBER.LINK}
                </a>
              </Paragraph>
              <Paragraph>
                {STRINGS.WARNING_ALERT.EXISTING_SUBSCRIBER.SUBTITLE_2}{' '}
                <a href='https://radical.org.il/contact/'>
                  {STRINGS.WARNING_ALERT.EXISTING_SUBSCRIBER.LINK_2}
                </a>
              </Paragraph>
            </div>
          ),
        };
      case 'not_logged_in':
        return {
          message: STRINGS.WARNING_ALERT.NOT_LOGGED_IN.TITLE,
          description: STRINGS.WARNING_ALERT.NOT_LOGGED_IN.SUBTITLE,
        };
      default:
        return {
          message: 'אירעה שגיאה',
          description: 'אנא נסו שוב מאוחר יותר',
        };
    }
  }, [code]);

  return (
    <AlertWrapper>
      <Alert
        message={messages?.message}
        description={messages?.description}
        type='warning'
        afterClose={handleAfterClose}
        closable
      />
    </AlertWrapper>
  );
};

export default WarningAlert;
