import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/shopifyService';
import { useNavigate } from 'react-router-dom';
import { Order } from '../interfaces/Interfaces';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders: Order[] = await getOrders();
        setOrders(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Orders</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{`${order.customer.first_name} ${order.customer.last_name}`}</td>
              <td>{order.current_total_price}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
