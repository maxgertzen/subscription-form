import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  borderRadius: {
    button: '5px',
    radio: '10px',
    container: '12px',
  },
  color: {
    main: '#39B04C',
    mainLight: '#7ACC88',
    secondary: '#201A58',
    light: '#F5F2ED',
    white: '#FFF',
    black: '#000',
    grey: '#C3C0C0',
    red: '#F75640',
  },
  fontFamily: {
    main: 'Leon, sans-serif',
    mainBold: 'Leonbold, sans-serif',
    secondary: 'Montserrat, sans-serif',
  },
  fontSize: {
    input: '1.2rem',
    label: '1.4rem',
    button: '1.6rem',
    title: '2.4rem',
    subtitle: '1.8rem',
  },
};

export default theme;
