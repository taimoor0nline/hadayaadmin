import apiService from './apiService';
import { IZone } from '../interfaces/Zone';
import { IPagedResult } from '../interfaces/IPagedResult';

export const getZones = async (
  page: number,
  name?: string
): Promise<IPagedResult<IZone>> => {
  const response = await apiService.get('/zones/list', {
    params: {
      page,
      name,
    },
  });
  return response.data;
};

export const createZone = async (zone: IZone): Promise<IZone> => {
  const response = await apiService.post('/zones/create', zone);
  return response.data;
};

export const updateZone = async (id: number, zone: IZone): Promise<void> => {
  await apiService.put(`/zones/detail/${id}`, zone);
};

export const deleteZone = async (id: number): Promise<void> => {
  await apiService.delete(`/zones/delete/${id}`);
};
