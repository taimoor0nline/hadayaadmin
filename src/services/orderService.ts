import apiService from './apiService';
import { IOrder } from '../interfaces/Order';
import { IPagedResult } from '../interfaces/IPagedResult';

interface IOrderSearchParams {
  page?: number;
  limit?: number;
  shopifyOrderId?: string;
  phone?: string;
  email?: string;
  recipientPhone?: string;
  area?: string;
  senderName?: string;
}

export const getOrders = async (params: IOrderSearchParams = {}): Promise<IPagedResult<IOrder>> => {
  const {
    page = 1,
    limit = 10,
    shopifyOrderId,
    phone,
    email,
    recipientPhone,
    area,
    senderName
  } = params;

  // Adding a cache-busting parameter using the current timestamp
  const cacheBuster = new Date().getTime();
  const response = await apiService.get('shopify/list', {
    params: {
      page,
      limit,
      shopifyOrderId,
      phone,
      email,
      recipientPhone,
      area,
      senderName,
      ///_: cacheBuster, // The underscore is often used conventionally for cache-busting
    },
  });

  return response.data;
};

export const getOrderById = async (orderId: string): Promise<IOrder> => {
  //const cacheBuster = new Date().getTime(); // Cache-busting parameter

  // const response = await apiService.get(`shopify/${orderId}`, {
  //   params: { _: cacheBuster }, // Adding the cache-busting parameter
  // });

  const response = await apiService.get(`shopify/${orderId}`);

  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  // Implement the API call logic to update order status
};
