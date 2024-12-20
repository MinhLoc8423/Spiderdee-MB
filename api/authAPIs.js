import axiosInstance from '../helpers/axios';
import { API_ENDPOINTS } from '../constants/endPoints';

export const loginLocal = async (email, password) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, { email, password });
    console.log('Login response: ', response.data)
    return response.data;
  } catch (error) {
    console.log('Login error: ', error)
    throw error;
  }
};

export const register = async (first_name, last_name, email, password, phone_number,) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, { first_name, last_name, email, password, phone_number });
    console.log('Register response: ', response.data)
    return response.data;
  } catch (error) {
    console.log('Register error: ', error)
    throw error;
  }
};

export const sendOTP = async (email) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.SENDOTP, { email });
    console.log('Send OTP response: ', response.data)
    return response.data;
  } catch (error) {
    console.log('Send OTP error: ', error)
    throw error;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.VERIFYOTP, { email, otp });
    console.log('Verify OTP response: ', response.data)
    return response.data;
  } catch (error) {
    console.log('Verify OTP error: ', error)
    throw error;
  }
};

export const resetPassword = async (newPassword, otpToken) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.RESTPASSWORD, { newPassword, otpToken });
    console.log('Reset password response: ', response.data)
    return response.data;
  } catch (error) {
    console.log('Reset password error: ', error)
    throw error;
  }
};
