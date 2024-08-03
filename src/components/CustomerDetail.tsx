import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerById } from '../services/shopifyService';
import { Customer } from '../interfaces/Interfaces';

const CustomerDetail: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        const customer = await getCustomerById(customerId as any);
        console.log('Customer Detail:', customer); // Log the response
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
          <h2>{customer.first_name} {customer.last_name}</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>Customer ID:</strong> {customer.id}</p>
              <p><strong>Email:</strong> {customer.email || 'N/A'}</p>
              <p><strong>Phone:</strong> {customer.phone || 'N/A'}</p>
              <p><strong>State:</strong> {customer.state}</p>
              <p><strong>Verified Email:</strong> {customer.verified_email ? 'Yes' : 'No'}</p>
              <p><strong>Currency:</strong> {customer.currency}</p>
              <p><strong>Created At:</strong> {new Date(customer.created_at).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(customer.updated_at).toLocaleString()}</p>
              <p><strong>Note:</strong> {customer.note || 'N/A'}</p>
              <p><strong>Tax Exempt:</strong> {customer.tax_exempt ? 'Yes' : 'No'}</p>
              <p><strong>Tags:</strong> {customer.tags || 'N/A'}</p>
              <p><strong>SMS Marketing Consent:</strong> {customer.sms_marketing_consent?.state}</p>
            </div>
            <div className="col-md-6">
              <h4>Default Address</h4>
              <p><strong>Address 1:</strong> {customer.default_address.address1}</p>
              <p><strong>Address 2:</strong> {customer.default_address.address2 || 'N/A'}</p>
              <p><strong>City:</strong> {customer.default_address.city}</p>
              <p><strong>Country:</strong> {customer.default_address.country}</p>
              <p><strong>Country Code:</strong> {customer.default_address.country_code}</p>
              <p><strong>Phone:</strong> {customer.default_address.phone || 'N/A'}</p>
              <p><strong>Province:</strong> {customer.default_address.province || 'N/A'}</p>
              <p><strong>ZIP:</strong> {customer.default_address.zip || 'N/A'}</p>
              <p><strong>Company:</strong> {customer.default_address.company || 'N/A'}</p>
              <p><strong>Name:</strong> {customer.default_address.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
