import React from 'react';
import { House, DashCircle } from 'react-bootstrap-icons';
import { BsFillPeopleFill, BsChatDotsFill, BsGearFill, BsGridFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { MdLocationCity } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import { logout } from '../services/authService';
import { RiPagesFill, RiPagesLine } from '@remixicon/react';

interface SidebarProps {
  isMobile: boolean;
  show: boolean;
  handleClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, show, handleClose }) => {
  const sidebarContent = (
    <div className="d-flex flex-column p-3 sticky top-0" style={{ width: '250px', height: '100vh', backgroundColor: '#343a40' }}>
      <ul className="nav nav-pills flex-column mb-auto">
        <Link to="/" className="nav-link custom-nav-link">
          <House className="me-2" />
          Home
        </Link>
        <Link to="/dashboard" className="nav-link custom-nav-link">
          <RiPagesLine />
          Dashboard
        </Link>
        <Link to="/delivery-slot" className="nav-link custom-nav-link">
          <BsGearFill className="me-2" />
          Delivery Slots
        </Link>

        <Link to="/orders/list" className="nav-link custom-nav-link">
          <BsChatDotsFill className="me-2" />
          Orders
        </Link>
        <Link to="/customers" className="nav-link custom-nav-link">
          <DashCircle className="me-2" />
          Customers
        </Link>
        <Link to="/zone" className="nav-link custom-nav-link">
          <BsGridFill className="me-2" />
          Zones
        </Link>
        <Link to="/area" className="nav-link custom-nav-link">
          <MdLocationCity className="me-2" />
          Areas
        </Link>
        <Link to="/login" className="nav-link custom-nav-link" onClick={logout}>
          <BiLogOut className="me-2" />
          Logout
        </Link>
      </ul>
    </div>
  );


  return isMobile ? (
    <Offcanvas show={show} onHide={handleClose} style={{ width: '400px', background: '#343a40' }}>
      <Offcanvas.Header closeButton />
      <Offcanvas.Body>
        {sidebarContent}
      </Offcanvas.Body>
    </Offcanvas>
  ) : (
    <div className="d-none d-md-block">{sidebarContent}</div>
  );
};

export default Sidebar;
