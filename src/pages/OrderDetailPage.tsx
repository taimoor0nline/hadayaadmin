import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import OrderDetail from '../components/OrderDetail';
import { Button } from 'react-bootstrap';

const OrderDetailPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { orderId } = useParams<{ orderId: string }>();

  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  // Check if the screen width is mobile size (less than 768px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(false); // Ensure sidebar is closed on desktop
      }
    };

    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="d-flex">
      {/* Pass the required props here */}
      <Sidebar isMobile={isMobile} show={showSidebar} handleClose={handleClose} />

      <div className="flex-grow-1">
        <Navbar />
        {isMobile && (
          <Button variant="primary" onClick={handleShow} className="m-2">
            Toggle Sidebar
          </Button>
        )}
        {orderId && <OrderDetail orderId={orderId} />}
      </div>
    </div>
  );
};

export default OrderDetailPage;
