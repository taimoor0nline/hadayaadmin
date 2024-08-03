import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import OrderDetail from '../components/OrderDetail';

const OrderDetailPage: React.FC = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <OrderDetail />
      </div>
    </div>
  );
};

export default OrderDetailPage;
