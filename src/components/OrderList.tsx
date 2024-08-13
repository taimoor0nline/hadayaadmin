import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import { getOrders } from '../services/orderService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { IMappedOrder } from '../interfaces/Order';

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<IMappedOrder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchField, setSearchField] = useState('zone');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const fetchOrders = async () => {
    const searchParams = {
      [searchField]: searchValue,
    };
  
    const result = await getOrders({
      page: currentPage,
      limit: 10,
      ...searchParams,
    });

    const mappedOrders: IMappedOrder[] = result.data.map((order: any) => ({
      shopifyOrderId: order.shopifyOrderId || 'N/A',
      zoneName: order.zoneName || 'N/A',
      areaName: order.areaName || 'N/A',
      senderName: order.senderName || 'N/A',
      senderEmail: order.senderEmail || 'N/A',
      senderPhone: order.senderPhone || 'N/A',
      recipientPhone: order.recipientPhone || 'N/A',
      status: order.status || 'N/A',
    }));
    setOrders(mappedOrders);
    setTotalPages(result.totalPages);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchOrders();
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
              <h2>Order List</h2>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-3">
                  <select
                    className="form-control"
                    value={searchField}
                    onChange={handleFieldChange}
                  >
                    <option value="zone">Zone</option>
                    <option value="area">Area</option>
                    <option value="senderPhone">Sender Phone</option>
                    <option value="senderEmail">Sender Email</option>
                    <option value="recipientPhone">Receiver Phone</option>
                    <option value="shopifyOrderId">Order ID</option>
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
                    <th>Zone</th>
                    <th>Area</th>
                    <th>Sender Name</th>
                    <th>Sender Email</th>
                    <th>Sender Phone</th>
                    <th>Receiver Phone</th>
                    <th>Shopify Order ID</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.shopifyOrderId}>
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td>{order.zoneName}</td>
                      <td>{order.areaName}</td>
                      <td>{order.senderName}</td>
                      <td>{order.senderEmail}</td>
                      <td>{order.senderPhone}</td>
                      <td>{order.recipientPhone}</td>
                      <td>{order.shopifyOrderId}</td>
                      <td>{order.status}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => window.location.href = `/orders/detail/${order.shopifyOrderId}`}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
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

export default OrderListPage;