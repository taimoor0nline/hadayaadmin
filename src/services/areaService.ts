import apiService from './apiService';
import { IArea } from '../interfaces/Area';
import { IPagedResult } from '../interfaces/IPagedResult';

interface IAreaPayload {
  id: number;
  name: string;
  zoneId: number;
}

export const getAreas = async (
  page: number,
  name?: string,
  zoneName?: string
): Promise<IPagedResult<IArea>> => {
  const response = await apiService.get('/areas/list', {
    params: {
      page,
      name,
      zoneName,
    },
  });
  return response.data;
};

export const createArea = async (area: IAreaPayload): Promise<IArea> => {
  const response = await apiService.post('/areas/create', area);
  return response.data;
};

export const updateArea = async (id: number, area: IAreaPayload): Promise<void> => {
  await apiService.put(`/areas/detail/${id}`, area);
};

export const deleteArea = async (id: number): Promise<void> => {
  await apiService.delete(`/areas/delete/${id}`);
};
