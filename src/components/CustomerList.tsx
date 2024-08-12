import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { ICustomer } from '../interfaces/Customer';
import { getCustomers } from '../services/customerService';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchField, setSearchField] = useState('phone');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [currentPage]);

  const fetchCustomers = async () => {
    let result;
    if (searchField === 'phone') {
      result = await getCustomers(currentPage, 10, '', searchValue);
    } else if (searchField === 'email') {
      result = await getCustomers(currentPage, 10, searchValue, '');
    }

    if (result) {
      setCustomers(result.data);
      setTotalPages(result.totalPages);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchCustomers();
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchField(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <div className="container mt-4">
          <div className="card">
            <div className="card-header">
              <h2>Customer List</h2>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-3">
                  <select
                    className="form-control"
                    value={searchField}
                    onChange={handleFieldChange}
                  >
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    value={searchValue}
                    onChange={handleInputChange}
                    placeholder={`Enter ${searchField}`}
                  />
                </div>
                <div className="col-md-3">
                  <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={customer.id}>
                      <td>{index + 1 + (currentPage - 1) * 10}</td>
                      <td>{customer.firstName}</td>
                      <td>{customer.lastName}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
