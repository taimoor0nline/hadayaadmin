// src/services/shopifyService.ts

import axios from 'axios';
import { Order } from '../interfaces/Interfaces';

const SHOPIFY_API_URL = 'https://testhadaya.myshopify.com/admin/api/2024-07';
const SHOPIFY_ACCESS_TOKEN = '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';

const shopifyService = axios.create({
  baseURL: SHOPIFY_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
  },
});

export const getOrders = async (): Promise<Order[]> => {
  const response = await shopifyService.get('/orders.json?status=any');
  return response.data.orders;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await shopifyService.get(`/orders/${orderId}.json`);
  return response.data.order;
};

export default shopifyService;
