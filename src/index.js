import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/global.css';
import App from './routes/App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './context/UserContext'
import { getCurrentUser } from './utils/helpers'

ReactDOM.render(
  <UserContextProvider >
      <App />
  </UserContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
