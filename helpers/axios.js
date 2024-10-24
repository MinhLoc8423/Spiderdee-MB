import axios from 'axios';
import { API_BASE_URL } from '../constants/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,  
  timeout: 10000,  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async(config) => {
    const token = await AsyncStorage.getItem('accessTokenUser');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response.data || 'Something went wrong');
  }
);

export default axiosInstance;
