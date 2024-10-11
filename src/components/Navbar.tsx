import { RiLogoutCircleLine } from '@remixicon/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Use navigate for better routing
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Admin Panel</a>

        <button className="btn btn-outline-danger d-flex align-items-center" onClick={handleLogout}>
          <RiLogoutCircleLine color="red" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
