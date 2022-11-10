import { blueGrey, grey, indigo, pink, red } from '@mui/material/colors';
import { env } from './tools';

export const CONFIG = {
  mongoDb: env('REACT_APP_MONGODB_URL').value ?? '',
  backend: env('REACT_APP_BACKEND').expect(),
  colors: {
    commonOff: {
      backgroundColor: pink[500],
      color: '#fff',
    },
    off: {
      backgroundColor: pink[100],
      color: blueGrey['800'],
    },
    weekend: {
      backgroundColor: grey[100],
      color: blueGrey['800'],
    },
    work: {
      backgroundColor: indigo[500],
      color: '#fff',
    },
    regular: {
      backgroundColor: '#fff',
      color: blueGrey['800'],
    },
    border: 'var(--border)',
    todayBorder: red[500],
  },
};
