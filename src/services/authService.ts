import api from '../api/api';

export const authService = {
  login: async (data: any) => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  }
};
