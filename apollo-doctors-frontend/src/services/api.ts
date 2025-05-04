import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://doctor-clone-1-o2jl.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const doctorApi = {
  // Get all doctors with filters and pagination
  getDoctors: async (params: any = {}) => {
    const response = await api.get('/doctors', { params });
    return response.data;
  },

  // Add a new doctor
  addDoctor: async (doctorData: any) => {
    const response = await api.post('/doctors', doctorData);
    return response.data;
  },

  // Get filter options
  getFilterOptions: async () => {
    const response = await api.get('/doctors/filter-options');
    return response.data;
  },
};

export default api;
