import { css } from 'styled-components';

const SharedStyles = css`
  font-family: ${(props) => props.theme.fontFamily.main};
`;

export const SharedTypographyStyles = SharedStyles;

const HeadingOne = css`
  font-size: 1.625rem;
  color: #000;
  font-family: ${(props) => props.theme.fontFamily.mainBold};
  font-weight: 900;
  line-height: normal;
  margin: 0;
`;

const HeadingThree = css`
  color: ${(props) => props.theme.color.black};
  font-family: ${(props) => props.theme.fontFamily.main};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
`;

const Paragraph = css`
  color: ${(props) => props.theme.color.black};
  font-family: ${(props) => props.theme.fontFamily.main};
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 0.75rem;
  margin: 0;
`;

const Typography = () => {};

Typography.HeadingOne = HeadingOne;
Typography.HeadingThree = HeadingThree;
Typography.Paragraph = Paragraph;

export default Typography;
