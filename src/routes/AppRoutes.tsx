import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrderList from '../components/OrderList';
import OrderDetailPage from '../pages/OrderDetailPage';
import CustomerList from '../components/Customer';
import CustomerDetail from '../components/CustomerDetail';
import CustomerPage from '../pages/CustomerPage';
import CustomerDetailPage from '../pages/CustomerDetailPage';
import HomePage from '../pages/HomePage';
import OrderPage from '../pages/OrderPage';
import LoginPage from '../pages/LoginPage';
import DeliverSlotPage from '../pages/DeliverSlotPage'; // Import the new page

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
      <Route path="/orders/:orderId" element={<PrivateRoute><OrderDetailPage /></PrivateRoute>} />
      <Route path="/customers" element={<PrivateRoute><CustomerPage /></PrivateRoute>} />
      <Route path="/customers/:customerId" element={<PrivateRoute><CustomerDetailPage /></PrivateRoute>} />
      <Route path="/delivery-slot" element={<PrivateRoute><DeliverSlotPage /></PrivateRoute>} /> {/* Add the new route */}
    </Routes>
  </Router>
);

export default AppRoutes;
