import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
    const handleLogout = () => {
        authService.logout();
        window.location.href = '/login';
    };

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="pushmenu" to="#" role="button">
                        <i className="fa fa-bars"></i>
                    </Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/home" className="nav-link">Home</Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
