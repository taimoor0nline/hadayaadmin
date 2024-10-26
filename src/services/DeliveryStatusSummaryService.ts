import axios from 'axios';
import { IDeliveryStatusSummaryResponse } from '../interfaces/DeliveryStatusSummary';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const DeliveryStatusSummaryService = {
  async getDeliveryStatusSummaryByDate(date: string): Promise<IDeliveryStatusSummaryResponse> {
    try {
      const response = await axios.get<IDeliveryStatusSummaryResponse>(`${API_BASE_URL}/shopify/summary/${date}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching delivery status summary:', error);
      throw error;
    }
  },
};

export default DeliveryStatusSummaryService;
