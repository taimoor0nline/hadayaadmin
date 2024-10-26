import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DeliveryStatusSummaryService from '../services/DeliveryStatusSummaryService';
import { IDeliveryStatusSummary } from '../interfaces/DeliveryStatusSummary';

const DeliveryStatusSummaryTable: React.FC = () => {
  const [summaries, setSummaries] = useState<IDeliveryStatusSummary[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await DeliveryStatusSummaryService.getDeliveryStatusSummaryByDate(date);
        setSummaries(data.summaries);
        setTotalOrders(data.totalOrders);
      } catch (error) {
        console.error('Failed to fetch delivery status summary', error);
      }
    };

    fetchSummary();
  }, [date]);

  const handleCellClick = (slotName: string, status: string) => {
    navigate(`/orders/list?slot=${slotName}&status=${status}`);
  };

  return (
    <div>
      <h3>Select Date:</h3>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <Table striped responsive="sm">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Collecting Address</th>
            <th>Confirmed</th>
            <th>Preparing</th>
            <th>Ready</th>
            <th>Picked</th>
            <th>Delivering</th>
            <th>Delivered</th>
            <th>Cancelled</th>
            <th>Returned</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((summary, index) => (
            <tr key={index}>
              <td>{summary.slotName}</td>
              <td onClick={() => handleCellClick(summary.slotName, 'Collecting Address')}>{summary.collectingAddress}</td>
              <td onClick={() => handleCellClick(summary.slotName, 'Confirmed')}>{summary.confirmed}</td>
              <td onClick={() => handleCellClick(summary.slotName, 'Preparing')}>{summary.preparing}</td>
              <td onClick={() => handleCellClick(summary.slotName, 'Ready')}>{summary.ready}</td>
              <td onClick={() => handleCellClick(summary.slotName, 'Picked')}>{summary.picked}</td>
              <td onClick={() => handleCellClick(summary.slotName, 'Delivering')}>{summary.delivering}</td>
              <td onClick={() => handleCellClick(summary.slotName, 'Delivered')}>{summary.delivered}</td>
              <td onClick={() => handleCellClick(summary.slotName, 'Cancelled')}>{summary.cancelled}</td>
              <td onClick={() => handleCellClick(summary.slotName, 'Returned')}>{summary.returned}</td>
              <td>{summary.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={10}><strong>Total Orders</strong></td>
            <td><strong>{totalOrders}</strong></td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default DeliveryStatusSummaryTable;
