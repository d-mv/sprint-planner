import { StrictMode } from 'react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './shared/classes.css';

import { App } from './app';
import reportWebVitals from './reportWebVitals';
import { getMessage, StateProvider } from './state';
import { theme, query } from './shared';
import { AppContext } from './entities';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <StateProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{ query, getMessage }}>
          <App />
        </AppContext.Provider>
      </ThemeProvider>
    </StateProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
