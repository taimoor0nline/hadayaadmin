import apiService from './apiService';

const login = async (email: string, password: string) => {
  try {
    const response = await apiService.post('/userAuth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

export { login };
