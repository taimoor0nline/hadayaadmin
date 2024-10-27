import apiService from './apiService';
import { IOrderPackingSlipResponse } from '../interfaces/IOrderPackingSlip';

export const getPackingSlipBySlotId = async (slotId: string): Promise<IOrderPackingSlipResponse> => {
  const response = await apiService.get(`/packing-slip/by-slot-id/${slotId}`);
  return response.data;
};