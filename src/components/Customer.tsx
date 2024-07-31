import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/shopifyService';
import { Customer, Order } from '../interfaces/Interfaces';
import { useNavigate } from 'react-router-dom';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders: Order[] = await getOrders();
        const uniqueCustomers = orders.reduce((acc: Customer[], order) => {
          const customer = order.customer;
          if (customer && !acc.find((c) => c.id === customer.id)) {
            acc.push(customer);
          }
          return acc;
        }, []);
        setCustomers(uniqueCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Customer List extracted from Shopify orders</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/customers/${customer.id}`)}
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

export default CustomerList;
