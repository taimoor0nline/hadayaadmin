import React from 'react';
import { House, DashCircle, ShieldFillExclamation  } from 'react-bootstrap-icons';
import { BsFillPeopleFill, BsChatDotsFill, BsGearFill  } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="d-flex flex-column p-3" style={{ width: '250px', height: '100vh', backgroundColor: '#343a40' }}>
      <div className='mt-5' style={{ width: '100%', marginLeft: '-1rem' }}>
        <hr className='border border-2 m-0' style={{ width: 'calc(100% + 2rem)' }} />
      </div>

      {/* <div className='mt-5' style={{ width: '100%', marginLeft: '-1rem' }}>
       
        <hr className='border border-2 m-0' style={{ width: 'calc(100% + 2rem)' }} />
      </div> */}

      <ul className="nav nav-pills flex-column mb-auto">

      <Link to="/home" className="nav-link custom-nav-link">
          <House className="me-2" />
          Home
        </Link>
        
        <Link to="/delivery-slot" className="nav-link custom-nav-link">
          <BsGearFill className="me-2" />
          Delivery Slots
        </Link>

        <Link to="/orders" className="nav-link custom-nav-link">
          <BsChatDotsFill className="me-2" />
          Orders
        </Link>

        <Link to="/customer" className="nav-link custom-nav-link">
          <DashCircle className="me-2" />
          Customers
        </Link>

        <Link to="/logout" className="nav-link custom-nav-link">
          <BiLogOut  className="me-2" />
          Logout
        </Link>

      </ul>
    </div>
  );
};

export default Sidebar;