import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import {
  createTheme,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';
import { ThemeProvider } from '@emotion/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  palette: { primary: { main: '#12B564' } },
  typography: { fontFamily: 'Noto Sans KR' },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
