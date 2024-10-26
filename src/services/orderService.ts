import apiService from './apiService';
import { IOrder } from '../interfaces/Order';
import { IPagedResult } from '../interfaces/IPagedResult';

export interface IOrderSearchParams {
  page?: number;
  limit?: number;
  shopifyOrderId?: string;
  phone?: string;
  email?: string;
  recipientPhone?: string;
  area?: string;
  senderName?: string;
  slot?: string;
  status?: string;
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
    senderName,
  } = params;

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
      _: cacheBuster, 
    },
  });

  return response.data;
};


export const getOrderById = async (orderId: string): Promise<IOrder> => {
  const response = await apiService.get(`shopify/${orderId}`);
  return response.data;
};


export const updateOrderStatus = async (orderId: string, status: string) => {
  debugger;
  try {
    const response = await apiService.put(`shopify/update/status/${orderId}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};


export const updateRecipientDetails = async (orderId: string, recipientPhone?: string, recipientAddress?: string) => {
  try {
    const response = await apiService.put(`shopify/update/recipient/${orderId}`, {
      recipientPhone,
      recipientAddress,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating recipient details:', error);
    throw error;
  }
};
