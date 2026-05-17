import axios from 'axios';
import { API_BASE_URL } from '../config/environment';
import { tokenStorage } from '../storage/tokenStorage';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(async config => {
  const token = await tokenStorage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});