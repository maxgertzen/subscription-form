import styled from 'styled-components';

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  position: relative;
  height: 675px;
  box-sizing: border-box;
  direction: rtl;
  background-color: #f5f2ed;
  text-align: right;
  border-radius: ${({ theme }) => theme.borderRadius.container};
`;

export default StyledFormWrapper;
