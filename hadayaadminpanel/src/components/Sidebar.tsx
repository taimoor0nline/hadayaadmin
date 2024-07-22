import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <Link to="/" className="brand-link">
      <span className="brand-text font-weight-light">AdminLTE</span>
    </Link>
    <div className="sidebar">
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              <i className="nav-icon fa fa-home"></i>
              <p>Home</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <i className="nav-icon fa fa-dashboard"></i>
              <p>Dashboard</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
);

export default Sidebar;
