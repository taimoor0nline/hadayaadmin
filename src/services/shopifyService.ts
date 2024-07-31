import axios from 'axios';
import { Order } from '../interfaces/Interfaces';
import API_BASE_URL from '../config/apiConfig';

const shopifyService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await shopifyService.get('/shopify/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const response = await shopifyService.get(`/shopify/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};

export default shopifyService;
