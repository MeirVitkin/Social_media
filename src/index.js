import React from 'react';
import ReactDOM from 'react-dom/client';
import AppTest from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter  } from 'react-router-dom';
import './style/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
      <AppTest/>
    </BrowserRouter>
  
);

reportWebVitals();