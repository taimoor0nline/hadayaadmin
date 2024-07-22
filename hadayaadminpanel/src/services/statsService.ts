import axios from 'axios';
import {API_URL} from '../config/apiConfig';
import { VisitorStatsModel, ConversationStatsModel } from '../interfaces/IStats';

const getVisitorStats = async (): Promise<VisitorStatsModel> => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/stats/visitor-stats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const getConversationStats = async (): Promise<ConversationStatsModel> => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/stats/conversation-stats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export { getVisitorStats, getConversationStats };
