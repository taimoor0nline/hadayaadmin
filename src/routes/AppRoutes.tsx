import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrderDetailPage from '../pages/OrderDetailPage';
import CustomerPage from '../pages/CustomerPage';
import CustomerDetailPage from '../pages/CustomerDetailPage';
import HomePage from '../pages/HomePage';
import OrderPage from '../pages/OrderDetailPage';
import LoginPage from '../pages/LoginPage';
import DeliverySlotPage from '../pages/DeliverySlotPage';
import OrderListPage from '../pages/ShopifyOrderListPage';
import ZonePage from '../pages/ZonePage';
import AreaPage from '../pages/AreaPage';
import ShopifyOrderListPage from '../pages/ShopifyOrderListPage';
import DashboardPage from '../pages/DashboardPage';
import PackingSlipPage from '../pages/PackingSlipPage';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} /> */}
      <Route path="/" element={<HomePage />} />
      <Route path="/orders/list" element={<ShopifyOrderListPage />} />  {/* OrderPage should map to the order listing */}
      <Route path="/orders/detail/:orderId" element={<OrderDetailPage />} />  {/* OrderDetailPage should map to order detail */}
      <Route path="/customers" element={<CustomerPage />} />
      <Route path="/customers/:customerId" element={<CustomerDetailPage />} />
      <Route path="/delivery-slot" element={<DeliverySlotPage />} />
      <Route path="/zone" element={<ZonePage />} />
      <Route path="/area" element={<AreaPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/packing-slip" element={<PackingSlipPage />} />
    </Routes>
  </Router>
);


export default AppRoutes;
