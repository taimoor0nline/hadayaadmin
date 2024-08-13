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

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/orders/list" element={<PrivateRoute><ShopifyOrderListPage/></PrivateRoute>} />  {/* OrderPage should map to the order listing */}
      <Route path="/orders/detail/:orderId" element={<PrivateRoute><OrderDetailPage /></PrivateRoute>} />  {/* OrderDetailPage should map to order detail */}
      <Route path="/customers" element={<PrivateRoute><CustomerPage /></PrivateRoute>} />
      <Route path="/customers/:customerId" element={<PrivateRoute><CustomerDetailPage /></PrivateRoute>} />
      <Route path="/delivery-slot" element={<PrivateRoute><DeliverySlotPage /></PrivateRoute>} />  
      <Route path="/zone" element={<PrivateRoute><ZonePage /></PrivateRoute>} /> 
      <Route path="/area" element={<PrivateRoute><AreaPage /></PrivateRoute>} />   
    </Routes>
  </Router>
);


export default AppRoutes;
