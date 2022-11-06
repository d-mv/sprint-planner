import { createTheme } from '@mui/material';
import { blue, blueGrey } from '@mui/material/colors';

export const CONSTANTS = {
  daysLineHeight: '4rem',
  engineerLineHeight: '5.5rem',
  engineersWidth: '57rem',
  subHeaderHeight: '6.5rem',
  engineerLineColor: blue[50],
};

export const theme = createTheme({
  palette: {
    text: {
      primary: blueGrey['800'],
      secondary: blueGrey['600'],
      disabled: blueGrey['400'],
    },
  },
  typography: {
    allVariants: { fontFamily: 'Roboto', color: blueGrey['800'] },
    h6: {
      fontSize: '1.6rem',
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
