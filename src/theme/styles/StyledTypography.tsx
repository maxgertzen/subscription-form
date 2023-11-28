import styled, { css } from "styled-components";

type SharedStyledTypographyProps = {
  fontWeight?: 400 | 500 | 600 | 700 | 800 | 900;
};

const SharedStyles = css`
  font-family: ${(props) => props.theme.fontFamily.main};
`;

export const SharedTypographyStyles = SharedStyles;

const HeadingOne = styled.h1<SharedStyledTypographyProps>`
  font-size: 1.625rem;
  color: #000;
  font-family: ${(props) => props.theme.fontFamily.mainBold};
  font-weight: ${({ fontWeight = 900 }) => fontWeight};
  line-height: normal;
`;

const HeadingThree = styled.h3<SharedStyledTypographyProps>`
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.fontFamily.main};
  font-size: 1rem;
  font-weight: ${({ fontWeight = 400 }) => fontWeight};
  line-height: 1.5rem;
`;

type TypographyVariants = "h1" | "h3";

interface TypographyProps {
  variant?: TypographyVariants;
  children: React.ReactNode;
}
export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
}) => {
  switch (variant) {
    case "h1":
      return <HeadingOne>{children}</HeadingOne>;
    case "h3":
      return <HeadingThree>{children}</HeadingThree>;
    default:
      return <HeadingThree>{children}</HeadingThree>;
  }
};
