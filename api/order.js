import axiosInstance from '../helpers/axios';
import { API_ENDPOINTS } from '../constants/endPoints';

export const createOrder = async (user_id, address, payment_method, orderDetails) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ORDER,  {user_id, address, payment_method, orderDetails});
        console.log('Create order response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Create order error: ', error);
        throw error;
    }
};

export const createLinkPayment = async (order_id) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.PAYMENT,  {order_id});
        console.log('Payment response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Payment error: ', error);
        throw error;
    }
};