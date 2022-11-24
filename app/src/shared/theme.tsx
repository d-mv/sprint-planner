import { createTheme } from '@mui/material';
import { blue, blueGrey, grey, lightBlue, lightGreen } from '@mui/material/colors';

export const CONSTANTS = {
  daysLineHeight: '4rem',
  engineerLineHeight: '5.5rem',
  engineersWidth: '57rem',
  subHeaderHeight: '7rem',
  engineerLineColor: blue[50],
  selectedEngineerLineColor: blue[100],
};

export const theme = createTheme({
  palette: {
    text: {
      primary: blueGrey['800'],
      secondary: blueGrey['600'],
      disabled: blueGrey['400'],
    },
    success: {
      light: lightGreen[300],
      main: lightGreen[500],
      dark: lightGreen[600],
      contrastText: blueGrey['800'],
    },
    primary: {
      light: lightBlue[600],
      main: lightBlue[700],
      dark: lightBlue[800],
      contrastText: grey[50],
    },
    background: { default: grey[50], paper: grey[100] },
  },
  typography: {
    allVariants: { fontFamily: 'Roboto', color: blueGrey['800'] },
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.6rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.6rem',
      fontWeight: 'normal',
    },
    body1: {
      fontSize: '1.6rem',
    },
    body2: {
      fontSize: '1.4rem',
    },
    subtitle1: {
      fontSize: '1.2rem',
    },
    subtitle2: {
      fontWeight: 300,
      fontSize: '1rem',
    },
    button: { fontSize: '1.2rem' },
  },
});
