import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DeliverySlot from '../components/DeliverSlot';
import { Button } from 'react-bootstrap';

const DeliverySlotPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(false);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="d-flex">
      <Sidebar isMobile={isMobile} show={showSidebar} handleClose={handleClose} />

      <div className="flex-grow-1">
        <Navbar />
        {isMobile && (
          <Button variant="primary" onClick={handleShow} className="m-2">
            Toggle Sidebar
          </Button>
        )}
        <DeliverySlot />
      </div>
    </div>
  );
};

export default DeliverySlotPage;
