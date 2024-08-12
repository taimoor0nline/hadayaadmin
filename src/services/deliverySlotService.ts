import apiService from './apiService';
import { IDeliverySlot } from '../interfaces/DeliverSlot';
import { IPagedResult } from '../interfaces/IPagedResult';

export const getDeliverySlots = async (
  page = 1,
  limit = 10
): Promise<IPagedResult<IDeliverySlot>> => {
  const response = await apiService.get('/delivery-slot/list');
  return response.data;
};

export const getDeliverySlotById = async (id: number): Promise<IDeliverySlot> => {
  const response = await apiService.get(`/delivery-slot/detail/${id}`);
  return response.data;
};

export const createDeliverySlot = async (slot: IDeliverySlot): Promise<IDeliverySlot> => {
  const response = await apiService.post('/delivery-slot/create', slot);
  return response.data;
};

export const updateDeliverySlot = async (
  id: number,
  slot: Partial<IDeliverySlot>
): Promise<IDeliverySlot> => {
  const response = await apiService.put(`/delivery-slot/update/${id}`, slot);
  return response.data;
};

export const deleteDeliverySlot = async (id: number): Promise<void> => {
  await apiService.delete(`/delivery-slot/delete/${id}`);
};