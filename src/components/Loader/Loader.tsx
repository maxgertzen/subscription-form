import React from 'react';

import { Spin } from 'antd';

import styled from 'styled-components';

const LoaderWrapper = styled.div`
  height: inherit;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  .ant-spin-dot {
    font-size: 4.5rem;
    margin-bottom: 6rem;
  }

  .ant-spin-dot-item {
    background-color: #39b04c;
  }
  .ant-spin-text {
    text-align: center;
    color: #39b04c;
  }
`;

const Loader: React.FC = () => {
  return (
    <LoaderWrapper>
      <Spin size='large' />
    </LoaderWrapper>
  );
};

export default Loader;
