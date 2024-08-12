import apiService from './apiService';
import { IZone } from '../interfaces/Zone';
import { IArea } from '../interfaces/Area';



export const getAreas = async (): Promise<IArea[]> => {
  const response = await apiService.get('/areas/list');
  return response.data;
};

export const createArea = async (area: IArea): Promise<IArea> => {
  const response = await apiService.post('/areas/create', area);
  return response.data;
};

export const updateArea = async (id: number, area: IArea): Promise<void> => {
  await apiService.put(`/areas/detail/${id}`, area);
};

export const deleteArea = async (id: number): Promise<void> => {
  await apiService.delete(`/areas/delete/${id}`);
};
