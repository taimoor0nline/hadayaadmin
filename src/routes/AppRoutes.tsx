// src/AppRoutes.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import DeliverSlotPage from '../pages/DeliverSlotPage';
import OrderPage from '../pages/OrderPage';
import CustomerPage from '../pages/CustomerPage';
import OrderDetail from '../components/OrderDetail';
import CustomerDetail from '../components/CustomerDetail';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/delivery-slot" element={<DeliverSlotPage />} />
      <Route path="/orders" element={<OrderPage />} />
      <Route path="/orders/:orderId" element={<OrderDetail orderId={''} />} /> 
      <Route path="/customers" element={<CustomerPage />} />
      <Route path="/customers/:customerId" element={<CustomerDetail customerId={''} />} />
    </Routes>
  </Router>
);

export default AppRoutes;
