import React from 'react';
import { Navbar } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import DeliverSlotTable from '../components/DeliverSlotTable';

const DeliverSlotPage: React.FC = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <DeliverSlotTable />
      </div>
    </div>
  );
};

export default DeliverSlotPage;
