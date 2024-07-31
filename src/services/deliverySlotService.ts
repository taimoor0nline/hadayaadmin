import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import { IDeliverSlot as DeliverSlot } from '../interfaces/IDeliverSlot';
import { PagedResult } from '../interfaces/IPagedResult';

const getDeliverSlots = async (page: number, pageSize: number, search: string = ''): Promise<PagedResult<DeliverSlot>> => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_BASE_URL}/delivery-slot/list`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page,
      limit: pageSize,
      search
    }
  });
  return response.data;
};

const getDeliverSlot = async (id: number): Promise<DeliverSlot> => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_BASE_URL}/delivery-slot/detail/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const createDeliverSlot = async (deliverSlot: DeliverSlot): Promise<DeliverSlot> => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_BASE_URL}/delivery-slot/create`, deliverSlot, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const updateDeliverSlot = async (id: number, deliverSlot: Partial<DeliverSlot>): Promise<DeliverSlot> => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_BASE_URL}/delivery-slot/update/${id}`, deliverSlot, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const deleteDeliverSlot = async (id: number): Promise<void> => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_BASE_URL}/delivery-slot/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export { getDeliverSlots, getDeliverSlot, createDeliverSlot, updateDeliverSlot, deleteDeliverSlot };
