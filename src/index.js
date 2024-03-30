import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { MetamaskProvider } from './hooks/useMetamask';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducers/user";
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({ reducer: rootReducer });
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MetamaskProvider>
          <App />
        </MetamaskProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

