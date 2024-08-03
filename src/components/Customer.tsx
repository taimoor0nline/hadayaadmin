import React, { useEffect, useState } from 'react';
import { getCustomers, CustomersResponse } from '../services/shopifyService';
import { useNavigate } from 'react-router-dom';
import { Customer } from '../interfaces/Interfaces';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [nextPageInfo, setNextPageInfo] = useState<string | null>(null);
  const [previousPageInfo, setPreviousPageInfo] = useState<string | null>(null);
  const navigate = useNavigate();
  const customersPerPage = 10;

  const fetchCustomers = async (pageInfo: string | null = null) => {
    try {
      const response: CustomersResponse = await getCustomers(customersPerPage, pageInfo);
      console.log('Customers Response:', response); // Log the response
      setCustomers(response.customers || []); // Ensure customers are set properly
      setNextPageInfo(response.nextPageInfo || null);
      setPreviousPageInfo(response.previousPageInfo || null);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handlePreviousPage = () => {
    if (previousPageInfo) {
      fetchCustomers(previousPageInfo);
    }
  };

  const handleNextPage = () => {
    if (nextPageInfo) {
      fetchCustomers(nextPageInfo);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Customers</h1>
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

export default CustomerList;
