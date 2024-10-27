import React, { useEffect, useState } from 'react';
import { getPackingSlipBySlotId } from '../services/packingSlipService';
import { IOrderPackingSlipResponse, IPackingSlipOrder } from '../interfaces/IOrderPackingSlip';
import '../styles/packingSlipPrint.css';

interface PackingSlipPrintProps {
  slotId: string;
}

const PackingSlipPrint: React.FC<PackingSlipPrintProps> = ({ slotId }) => {
  const [packingSlips, setPackingSlips] = useState<IPackingSlipOrder[]>([]);

  useEffect(() => {
    const fetchPackingSlips = async () => {
      try {
        const response: IOrderPackingSlipResponse = await getPackingSlipBySlotId(slotId);
        setPackingSlips(response.orders);
      } catch (error) {
        console.error('Error fetching packing slips:', error);
      }
    };

    fetchPackingSlips();
  }, [slotId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <button className="btn btn-primary pull-right" onClick={handlePrint}>
        Print Packing Slips
      </button>

      <div className="packing-slip-container">
        {packingSlips.map((order, index) => (
          <div key={index} className="packing-slip-page">
            <h3>Packing Slip</h3>
            <p>Order ID: {order.orderId}</p>
            <p>Receiver Name: {order.receiverName}</p>
            <p>Receiver Phone: {order.receiverPhone}</p>
            <p>Receiver Address: {order.receiverAddress}</p>
            <p>Zone: {order.zone}</p>
            <p>Area: {order.area}</p>
            <h4>Products:</h4>
            <ul>
              {order.products.map((product, productIndex) => (
                <li key={productIndex}>
                  <strong>{product.productName}</strong> - Qty: {product.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackingSlipPrint;
