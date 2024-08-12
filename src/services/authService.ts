import apiService from './apiService';

const login = async (email: string, password: string) => {
  try {
    const response = await apiService.post('/userAuth/login', { email, password });
    const token = response.data.content.token;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login'; // Redirect to login page
};


export { login,logout };
