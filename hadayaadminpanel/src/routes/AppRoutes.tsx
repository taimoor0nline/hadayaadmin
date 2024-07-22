import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import * as routes from '../config/routes';
import AuthWrapper from '../components/AuthWrapper';

const AppRoutes = () => (
  <Routes>
    <Route path={routes.LOGIN} element={<Login />} />
    <Route
      path={routes.HOME}
      element={
        <AuthWrapper>
          <Home />
        </AuthWrapper>
      }
    />
    <Route
      path={routes.DASHBOARD}
      element={
        <AuthWrapper>
          <Dashboard />
        </AuthWrapper>
      }
    />
    <Route
      path={routes.PROFILE}
      element={
        <AuthWrapper>
          <Profile />
        </AuthWrapper>
      }
    />
    <Route path="/" element={<Navigate to={routes.LOGIN} />} />
  </Routes>
);

export default AppRoutes;