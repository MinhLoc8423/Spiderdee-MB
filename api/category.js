import axiosInstance from '../helpers/axios';
import { API_ENDPOINTS } from '../constants/endPoints';

export const getAllCategories = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES);
        console.log('Categories response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Categories error: ', error);
        throw error;
    }
};