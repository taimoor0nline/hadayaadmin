import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DeliveryStatusSummaryTable from '../components/DeliveryStatusSummaryTable';

const DeliveryStatusSummaryPage: React.FC = () => {
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
        <Container fluid>
          <Row className="mt-3">
            <Col>
              <h2>Delivery Status Summary</h2>
              <DeliveryStatusSummaryTable />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DeliveryStatusSummaryPage;