import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Zone from '../components/Zone';

const ZonePage: React.FC = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <Zone />
      </div>
    </div>
  );
};

export default ZonePage;
