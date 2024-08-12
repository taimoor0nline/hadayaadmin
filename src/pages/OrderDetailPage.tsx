import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import OrderDetail from '../components/OrderDetail';

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        {orderId && <OrderDetail orderId={orderId} />}
      </div>
    </div>
  );
};

export default OrderDetailPage;
