import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Order from '../components/OrderList';
import Customer from '../components/Customer';

const CustomerPage: React.FC = () => {
  return (

    <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1">
      <Navbar />
      <Customer />
    </div>
  </div>

  );
};

export default CustomerPage;