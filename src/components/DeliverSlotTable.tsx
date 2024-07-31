import React, { useEffect, useState } from 'react';
import { getDeliverSlots } from '../services/deliverySlotService';
import { IDeliverSlot as DeliverSlot } from '../interfaces/IDeliverSlot';
import { PagedResult } from '../interfaces/IPagedResult';
import { Pagination } from 'react-bootstrap';
import dateFormat from 'dateformat';

const DeliverSlotTable: React.FC = () => {
  const [deliverSlots, setDeliverSlots] = useState<DeliverSlot[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  useEffect(() => {
    fetchDeliverSlots(currentPage, pageSize);
  }, [currentPage]);

  const fetchDeliverSlots = async (page: number, pageSize: number) => {
    const result: PagedResult<DeliverSlot> = await getDeliverSlots(page, pageSize);
    setDeliverSlots(result.items);
    setTotalItems(result.totalItems);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const maxVisibleButtons = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
    let endPage = startPage + maxVisibleButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisibleButtons + 1, 1);
    }

    const paginationItems = [];
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }

    return paginationItems;
  };

  return (
    <div className='container'>
      <div className='card'>
        <div className="card-header">
          <h2>Delivery Slots</h2>
        </div>
        <div className='card-body'>
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Threshold Minutes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {deliverSlots.map((slot, index) => (
                <tr key={slot.id}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td>{slot.date}</td>
                  <td>{slot.startTime}</td>
                  <td>{slot.endTime}</td>
                  <td>{slot.thresholdMinutes}</td>
                  <td>{slot.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} />
            {renderPaginationItems()}
            <Pagination.Next onClick={() => handlePageChange(Math.min(currentPage + 1, Math.ceil(totalItems / pageSize)))} />
            <Pagination.Last onClick={() => handlePageChange(Math.ceil(totalItems / pageSize))} />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default DeliverSlotTable;
