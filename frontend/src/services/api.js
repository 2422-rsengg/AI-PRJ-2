import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (username, password) =>
    api.post('/auth/login', { username, password }),
};

export const policyholdersAPI = {
  getAllPolicyholders: () => api.get('/policyholders/'),
  getStats: () => api.get('/policyholders/stats'),
};

export const recommendationsAPI = {
  generateRecommendation: (customerData) =>
    api.post('/recommend/', customerData),
};

export default api;
