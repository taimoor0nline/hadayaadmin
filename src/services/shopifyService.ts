import axios from 'axios';
import { Customer, Order } from '../interfaces/Interfaces';
import API_BASE_URL from '../config/apiConfig';

const shopifyService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface OrdersResponse {
  orders: Order[];
  nextPageInfo?: string;
  previousPageInfo?: string;
}
export interface CustomersResponse {
    customers: Customer[];
    nextPageInfo?: string;
    previousPageInfo?: string;
  }

  
export const getOrders = async (limit: number, pageInfo: string | null = null): Promise<OrdersResponse> => {
  try {
    const params: any = {
      limit,
      status: 'any',
    };
    if (pageInfo) {
      params.page_info = pageInfo;
    }
    const response = await shopifyService.get(`/shopify/orders`, { params });
    console.log('API Response:', response.data); // Log the API response
    return {
      orders: response.data, // Adjust this line based on actual API response structure
      nextPageInfo: response.headers['x-next-page-info'] || null,
      previousPageInfo: response.headers['x-previous-page-info'] || null,
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const response = await shopifyService.get(`/shopify/orders/${orderId}`);
    console.log('Order by ID Response:', response.data); // Log the API response
    return response.data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};


export const getCustomers = async (limit: number, pageInfo: string | null = null): Promise<CustomersResponse> => {
    try {
      const params: any = {
        limit,
        status: 'any',
      };
      if (pageInfo) {
        params.page_info = pageInfo;
      }
      const response = await shopifyService.get(`/shopify/customers`, { params });
      console.log('API Response:', response.data); // Log the API response
      return {
        customers: response.data, // Adjust this line based on actual API response structure
        nextPageInfo: response.headers['x-next-page-info'] || null,
        previousPageInfo: response.headers['x-previous-page-info'] || null,
      };
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  };
  
  export const getCustomerById = async (customerId: string): Promise<Customer> => {
    try {
      const response = await shopifyService.get(`/shopify/customers/${customerId}`);
      console.log('Customer by ID Response:', response.data); // Log the API response
      return response.data;
    } catch (error) {
      console.error('Error fetching customer by ID:', error);
      throw error;
    }
  };


  export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
    try {
      const response = await shopifyService.put(`/shopify/orders/${orderId}`, {
        order: {
          id: orderId,
          fulfillment_status: status,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };
export default shopifyService;
