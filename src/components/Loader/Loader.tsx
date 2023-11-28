import React from "react";

import { Spin } from "antd";

import styled from "styled-components";
import { STRINGS } from "../../language";

const LoaderWrapper = styled.div`
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
      <Spin size='large' tip={STRINGS.LOADER_TEXT}>
        <div />
      </Spin>
    </LoaderWrapper>
  );
};

export default Loader;
