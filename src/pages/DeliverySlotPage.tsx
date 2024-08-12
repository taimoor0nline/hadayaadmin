import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DeliverySlot from '../components/DeliverSlot';

const DeliverySlotPage: React.FC = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <DeliverySlot />
      </div>
    </div>
  );
};

export default DeliverySlotPage;
