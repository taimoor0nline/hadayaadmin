// src/components/CustomerDetail.tsx

import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/shopifyService';
import { Customer, Order } from '../interfaces/Interfaces';

interface CustomerDetailProps {
  customerId: string;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customerId }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        const orders: Order[] = await getOrders();
        const customer = orders.find(order => order.customer.id === customerId)?.customer;
        setCustomer(customer || null);
      } catch (error) {
        console.error('Error fetching customer detail:', error);
      }
    };

    fetchCustomerDetail();
  }, [customerId]);

  if (!customer) {
    return <p>Loading customer details...</p>;
  }

  return (
    <div>
      <h1>Customer Details</h1>
      <p>Customer ID: {customer.id}</p>
      <p>Name: {customer.first_name} {customer.last_name}</p>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
    </div>
  );
};

export default CustomerDetail;
