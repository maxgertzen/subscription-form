import { css } from 'styled-components';

const HeadingOne = css`
  font-size: 1.625rem;
  color: #000;
  font-family: 'Leonbold';
  font-weight: 900;
  line-height: normal;
  margin: 0;
`;

const HeadingThree = css`
  color: ${(props) => props.theme.color.black};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
`;

const Paragraph = css`
  color: ${(props) => props.theme.color.black};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.3rem;
  margin: 0;
`;

const Typography = () => {};

Typography.HeadingOne = HeadingOne;
Typography.HeadingThree = HeadingThree;
Typography.Paragraph = Paragraph;

export default Typography;
