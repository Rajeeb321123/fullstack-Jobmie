import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// REDUX 
import  { configureStore } from "@reduxjs/toolkit";
import globalReducer from './state';
import { Provider } from 'react-redux';
// for api call through redux
import { setupListeners } from '@reduxjs/toolkit/dist/query';


const store = configureStore({
  reducer:{
    global: globalReducer, 
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<Provider store={store}>
    <App />
</Provider>
  </React.StrictMode>,
)
