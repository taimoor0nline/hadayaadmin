import React, { useEffect, useState } from 'react';
import { getOrders, OrdersResponse } from '../services/shopifyService';
import { useNavigate } from 'react-router-dom';
import { Order } from '../interfaces/Interfaces';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [nextPageInfo, setNextPageInfo] = useState<string | null>(null);
  const [previousPageInfo, setPreviousPageInfo] = useState<string | null>(null);
  const navigate = useNavigate();
  const ordersPerPage = 10;

  const fetchOrders = async (pageInfo: string | null = null) => {
    try {
      const response: OrdersResponse = await getOrders(ordersPerPage, pageInfo);
      console.log('Orders Response:', response); // Log the response
      setOrders(response.orders || []); // Ensure orders are set properly
      setNextPageInfo(response.nextPageInfo || null);
      setPreviousPageInfo(response.previousPageInfo || null);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePreviousPage = () => {
    if (previousPageInfo) {
      fetchOrders(previousPageInfo);
    }
  };

  const handleNextPage = () => {
    if (nextPageInfo) {
      fetchOrders(nextPageInfo);
    }
  };

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
      <div className="d-flex justify-content-between">
        <button 
          className="btn btn-secondary"
          onClick={handlePreviousPage}
          disabled={!previousPageInfo}
        >
          Previous
        </button>
        <button 
          className="btn btn-secondary"
          onClick={handleNextPage}
          disabled={!nextPageInfo}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderList;
