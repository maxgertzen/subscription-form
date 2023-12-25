import styled from 'styled-components';

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  position: relative;
  height: 720px;
  box-sizing: border-box;
  direction: rtl;
  background-color: ${({ theme }) => theme.color.light};
  text-align: right;
  border-radius: ${({ theme }) => theme.borderRadius.container};
  padding-top: 1rem;
`;

export default StyledFormWrapper;
