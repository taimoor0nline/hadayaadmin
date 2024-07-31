import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Order from '../components/OrderList';

const OrderPage: React.FC = () => {
  return (

    <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1">
      <Navbar />
      <Order/>
    </div>
  </div>

  );
};

export default OrderPage;