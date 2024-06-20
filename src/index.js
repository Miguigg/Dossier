import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../src/css/index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Helmet} from 'react-helmet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
