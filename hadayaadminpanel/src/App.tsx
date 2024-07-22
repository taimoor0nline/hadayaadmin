import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';
import authService from './services/authService';

const App = () => {
  const isAuthenticated = authService.isAuthenticated();

  return (
    <Router>
      <div className="wrapper">
        {isAuthenticated && <Navbar />}
        {isAuthenticated && <Sidebar />}
        <div className="content-wrapper">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
};

export default App;