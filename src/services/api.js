// src/services/api.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      const user = JSON.parse(userData);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }
  return config;
});

export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);
export const logoutUser = () => api.post('/auth/logout');
export const getUserProfile = () => api.get('/user/profile');
export const updateUserProfile = (profileData) => api.put('/user/profile', profileData);
export const fetchExpenses = (params) => api.get('/expenses', { params });
export const getExpenseById = (id) => api.get(`/expenses/${id}`);
export const createExpense = (expenseData) => api.post('/expenses', expenseData);
export const editExpense = (id, expenseData) => api.put(`/expenses/${id}`, expenseData);
export const removeExpense = (id) => api.delete(`/expenses/${id}`);
export const getExpenseStats = (params) => api.get('/expenses/stats', { params });

export default api;