import axiosInstance from '../helpers/axios';
import { API_ENDPOINTS } from '../constants/endpoints';

export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.ORDERS);
        console.log('Orders response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Orders error: ', error);
        throw error;
    }
};