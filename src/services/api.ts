import axios from 'axios';

const BASE_URL = 'https://eye-api-abkr.onrender.com';

const api = axios.create({
  baseURL: BASE_URL
});

export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post<Response>(
    '/api/v1/auth/signin', 
    credentials
  );
  return response.data; 
};

export const signup = async (credentials: { email: string; password: string }) => {
  const response = await api.post<Response>(
    '/api/v1/auth/signup', 
    credentials
  );
  return response.data; 
};

export const logout = () => api.post('/api/v1/auth/logout');



export const startEaglesEye = async () => {
  const response = await api.post<any>(`/start`);
  return response.data;
};

export const stopEaglesEye = async () => {
  const response = await api.post<any>(`/stop`);
  return response.data;
};

export const checkEyeStatus = async () => {
  const response = await api.post<any>(`/status`);
  return response.data;
};

export const getAllEngines = async () => {
  const response = await api.get<any>(`/all`);
  return response.data;
};

export const startEngineById = async (
  id:string
) => {
  const response = await api.post<any>(`/start/${id}`);
  return response.data;
};

export const stopEngineById = async (
    id:string
) => {
  const response = await api.post<any>(`/stop/${id}`);
  return response.data;
};

export const checkEngineStatus = async (
  id:string
) => {
  const response = await api.post<any>(`/status/${id} `);
  return response.data;
};

export default api;