import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Home from '../components/Home';

const HomePage: React.FC = () => {
  return (

    <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1">
      <Navbar />
      <Home />
    </div>
  </div>

  );
};

export default HomePage;