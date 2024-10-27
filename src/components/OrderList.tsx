import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { IMappedOrder } from '../interfaces/Order';
import { useSearchParams } from 'react-router-dom';
import { getOrders } from '../services/orderService';
import { getPackingSlipBySlotId } from '../services/packingSlipService';
import { IOrderPackingSlipResponse, IPackingSlipOrder } from '../interfaces/IOrderPackingSlip';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<IMappedOrder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchField, setSearchField] = useState('zone');
  const [searchValue, setSearchValue] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [searchParams] = useSearchParams();
  const deliverySlotId = searchParams.get('deliverySlotId');
  const status = searchParams.get('status');

  useEffect(() => {
    fetchOrders();
  }, [currentPage, deliverySlotId, status, sortField, sortOrder]);

  const fetchOrders = async () => {
    try {
      const params = {
        page: currentPage,
        limit: 10,
        deliverySlotId: deliverySlotId || undefined,
        status: status || undefined,
        [searchField]: searchValue,
        sortField,
        sortOrder,
      };

      const result = await getOrders(params);

      const mappedOrders: IMappedOrder[] = result.data.map((order: any) => ({
        shopifyOrderId: order.shopifyOrderId || 'N/A',
        orderNumber: order.orderNumber || 0,
        deliverySlotName: order.deliverySlotName || 'N/A',
        isExpressDelivery: order.isExpressDelivery ? 'Yes' : 'No',
        orderNote: order.orderNote || 'N/A',
        isAddressNeededFromRcvr: order.isAddressNeededFromRcvr ? 'Yes' : 'No',
        isAddressUpdatedByRcvr: order.isAddressUpdatedByRcvr ? 'Yes' : 'No',
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
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleSort = (field: string) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
  };

  const handlePrintPackingSlip = async () => {
    if (!deliverySlotId) return alert('Please select a slot to print packing slips.');
  
    try {
      const response: IOrderPackingSlipResponse = await getPackingSlipBySlotId(deliverySlotId);
      const packingSlips = response.orders;
  
      const packingSlipWindow = window.open('', 'PRINT', 'width=800,height=600');
      if (packingSlipWindow) {
        packingSlipWindow.document.write(`
          <html>
            <head>
              <title>Packing Slip</title>
              <link rel="stylesheet" type="text/css" href="${process.env.PUBLIC_URL}/styles/packingSlipPrint.css">
              <style>
                @media print {
                  .packing-slip-page {
                    width: 105mm;
                    height: 148mm;
                    page-break-after: always;
                    padding: 10mm;
                    box-sizing: border-box;
                    font-size: 12px;
                    border: 1px solid #ccc;
                  }
                  .product-image {
                    max-width: 50px;
                    max-height: 50px;
                    object-fit: cover;
                  }
                }
              </style>
            </head>
            <body>
        `);
  
        packingSlips.forEach((order: IPackingSlipOrder) => {
          packingSlipWindow.document.write(`
            <div class="packing-slip-page">
              <h3>Packing Slip</h3>
              <p>Order ID: ${order.orderId}</p>
              <p>Receiver Name: ${order.receiverName}</p>
              <p>Receiver Phone: ${order.receiverPhone}</p>
              <p>Receiver Address: ${order.receiverAddress}</p>
              <p>Zone: ${order.zone}</p>
              <p>Area: ${order.area}</p>
              <h4>Products:</h4>
              <ul>
                ${order.products.map(product => `
                  <li>
                    <strong>${product.productName}</strong> - Qty: ${product.quantity}<br />
                    ${Array.isArray(product.productPicture)
                      ? product.productPicture.map(pic => `<img src="${pic}" alt="${product.productName}" class="product-image" />`).join('')
                      : `<img src="${product.productPicture}" alt="${product.productName}" class="product-image" />`
                    }
                  </li>
                `).join('')}
              </ul>
            </div>
          `);
        });
  
        packingSlipWindow.document.write(`
            </body>
          </html>
        `);
  
        packingSlipWindow.document.close();
  
        setTimeout(() => {
          packingSlipWindow.print();
          packingSlipWindow.close();
        }, 500); 
      }
    } catch (error) {
      console.error('Error fetching packing slips:', error);
      alert('Failed to fetch packing slips');
    }
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <div className="container mt-4">
          <div className="card">
            <div className="card-header">
              <button
                className='btn btn-primary pull-right'
                id='print-packing-slip'
                onClick={handlePrintPackingSlip}
              >
                Print Packing Slip
              </button>
            </div>
            <div className="card-body">
              {/* Other fields and search options */}
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th onClick={() => handleSort('orderNumber')}>Order Number</th>
                    <th onClick={() => handleSort('deliverySlotName')}>Delivery Slot</th>
                    <th onClick={() => handleSort('isExpressDelivery')}>Express Delivery</th>
                    <th onClick={() => handleSort('isAddressNeededFromRcvr')}>Receiver Address</th>
                    <th onClick={() => handleSort('isAddressUpdatedByRcvr')}>Address Updated by Receiver</th>
                    <th onClick={() => handleSort('zoneName')}>Zone</th>
                    <th onClick={() => handleSort('areaName')}>Area</th>
                    <th onClick={() => handleSort('senderName')}>Sender Name</th>
                    <th onClick={() => handleSort('senderPhone')}>Sender Phone</th>
                    <th onClick={() => handleSort('recipientPhone')}>Receiver Phone</th>
                    <th onClick={() => handleSort('status')}>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.shopifyOrderId}>
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td>{order.orderNumber}</td>
                      <td>{order.deliverySlotName}</td>
                      <td>{order.isExpressDelivery}</td>
                      <td>{order.isAddressNeededFromRcvr}</td>
                      <td>{order.isAddressUpdatedByRcvr}</td>
                      <td>{order.zoneName}</td>
                      <td>{order.areaName}</td>
                      <td>{order.senderName}</td>
                      <td>{order.senderPhone}</td>
                      <td>{order.recipientPhone}</td>
                      <td>{order.status}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => (window.location.href = `/orders/detail/${order.shopifyOrderId}`)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
