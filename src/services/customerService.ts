import apiService from './apiService';
import { ICustomer } from '../interfaces/Customer';
import { IPagedResult } from '../interfaces/IPagedResult';

export const getCustomers = async (
  page = 1,
  limit = 10,
  email?: string,
  phone?: string
): Promise<IPagedResult<ICustomer>> => {
  const response = await apiService.get('/customer/list', { params: { page, limit, email, phone } });
  return response.data;
};

export const getCustomerById = async (customerId: string): Promise<ICustomer> => {
  const response = await apiService.get(`/customer/${customerId}`);
  return response.data;
};
