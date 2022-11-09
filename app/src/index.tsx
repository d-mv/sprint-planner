import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './classes.css';

import { App } from './app';
import reportWebVitals from './reportWebVitals';
import { getMessage, StateProvider } from './state';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { AppContext } from './entities';
import { query } from './adaptors';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <StateProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{ query, getMessage }}>
          <App />
        </AppContext.Provider>
      </ThemeProvider>
    </StateProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
