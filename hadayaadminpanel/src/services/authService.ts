import axios from 'axios';
import { API_URL } from '../config/apiConfig';

const login = async (username: string, password: string) => {
  // Mock authentication logic
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('token', 'fake-jwt-token');
  } else {
    throw new Error('Invalid credentials');
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export default {
  login,
  logout,
  isAuthenticated,
};