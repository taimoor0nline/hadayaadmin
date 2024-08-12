import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import OrderList from '../components/OrderList';

const OrderListPage: React.FC = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <OrderList />
      </div>
    </div>
  );
};

export default OrderListPage;
