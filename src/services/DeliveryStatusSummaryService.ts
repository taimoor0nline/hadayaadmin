import axios from 'axios';
import apiService from './apiService';

import { IDeliveryStatusSummaryResponse } from '../interfaces/DeliveryStatusSummary';

export const getDeliveryStatusSummaryByDate = async (date: string): Promise<IDeliveryStatusSummaryResponse> => {
  const response = await apiService.get(`/shopify/summary/${date}`);
  return response.data;
};
