import apiService from './apiService';
import { IZone } from '../interfaces/Zone';



export const getZones = async (): Promise<IZone[]> => {
    const response = await apiService.get('/zones/list');
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