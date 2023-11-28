import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: {
      button: string;
      radio: string;
      container: string;
    };
    color: {
      main: string;
      mainLight: string;
      secondary: string;
      light: string;
      white: string;
      black: string;
      grey: string;
    };
    fontFamily: {
      main: string;
      mainBold: string;
      secondary: string;
    };
    fontSize: {
      input: string;
      label: string;
      button: string;
      title: string;
      subtitle: string;
    };
  }
}
