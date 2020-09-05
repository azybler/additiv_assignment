import React from 'react';
import { Router } from '@reach/router';
import Home from './pages/Home';
import Overview from './pages/Overview';

const App = () => {
  return (
    <Router className="bg-gray-200 antialiased">
      <Home path="/" />
      <Overview path="/overview/:employeeName" />
    </Router>
  );
};

export default App;
