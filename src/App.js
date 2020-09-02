import React from 'react';
import { Router } from '@reach/router';
import Home from './pages/Home';
import Overview from './pages/Overview';

const App = () => {
  return (
    <div className="bg-gray-200 antialiased">
      <Router>
        <Home path="/" />
        <Overview path="/overview/:employeeName" />
        <Overview path="/overview?name=:employeeName" />
      </Router>
    </div>
  );
};

export default App;
