import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuccessPage from './SuccessPage';
import App from './App';

function AppWrapper() {
    return (
        <Router>
        <Routes>
            <Route path="/login/success" element={<SuccessPage />} />
            <Route path="/" element={<App />} />
        </Routes>
        </Router>
      );
  }
  
  export default AppWrapper;