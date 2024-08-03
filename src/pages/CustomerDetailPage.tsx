import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CustomerDetail from '../components/CustomerDetail';

const CustomerPage: React.FC = () => {
  return (

    <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1">
      <Navbar />
      <CustomerDetail />
    </div>
  </div>

  );
};

export default CustomerPage;