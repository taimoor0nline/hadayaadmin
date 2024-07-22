import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

interface AuthWrapperProps {
    children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    return authService.isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthWrapper;