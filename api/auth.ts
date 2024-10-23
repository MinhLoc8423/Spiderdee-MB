import axiosInstance from '../helpers/axios';
import { API_ENDPOINTS } from '../constants/endpoints';

export const login = async (email: String, password: String) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, { email, password });
    console.log('Login response: ', response.data)
    return response.data;
  } catch (error) {
    console.log('Login error: ', error)
  }
};

export const register = async (first_name: String, last_name: String, email: String, password: String, phone_number: String,) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, { first_name, last_name, email, password, phone_number });
    console.log('Register response: ', response.data)
    return response.data;
  } catch (error) {
    console.log('Register error: ', error)
  }
};

export const sendOTP = async (email: String) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.SENDOTP, { email });
    console.log('Send OTP response: ', response.data)
    return response.data;
  } catch (error) {
    console.log('Send OTP error: ', error)
  }
};

