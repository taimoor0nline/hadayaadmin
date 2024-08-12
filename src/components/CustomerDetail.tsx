import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerById } from '../services/customerService';
import { ICustomer } from '../interfaces/Customer';

const CustomerDetail: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        const customer = await getCustomerById(customerId as any);
        setCustomer(customer);
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
    <div className="container mt-5">
      <h1 className="mb-4">Customer Details</h1>
      <div className="card">
        <div className="card-header">
          <h2>{customer.firstName} {customer.lastName}</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>Customer ID:</strong> {customer.id}</p>
              <p><strong>Shopify Customer ID:</strong> {customer.shopifyCustomerId}</p>
              <p><strong>Email:</strong> {customer.email || 'N/A'}</p>
              <p><strong>Phone:</strong> {customer.phone || 'N/A'}</p>
              <p><strong>Created At:</strong> {new Date(customer.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(customer.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
