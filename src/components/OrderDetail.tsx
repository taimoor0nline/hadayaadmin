// src/components/OrderDetail.tsx

import React, { useEffect, useState } from 'react';
import { getOrderById } from '../services/shopifyService';
import { Order } from '../interfaces/Interfaces';

interface OrderDetailProps {
  orderId: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const order = await getOrderById(orderId);
        setOrder(order);
      } catch (error) {
        console.error('Error fetching order detail:', error);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (!order) {
    return <p>Loading order details...</p>;
  }

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order.id}</p>
      <p>Customer: {order.customer?.first_name} {order.customer?.last_name}</p>
      <p>Total Price: {order.current_total_price}</p>
    </div>
  );
};

export default OrderDetail;
