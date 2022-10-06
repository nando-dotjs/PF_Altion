import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRoutes, Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRoutes>
    <Routes>
      <Route path="/*" element={<App/>} />
    </Routes>
    </BrowserRoutes>
  </React.StrictMode>
);

