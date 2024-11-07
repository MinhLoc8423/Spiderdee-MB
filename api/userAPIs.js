import axiosInstance from '../helpers/axios';
import { API_ENDPOINTS } from '../constants/endPoints';

export const getUserById = async (user_id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.USER+`${user_id}`);
        console.log('User by id response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('User by id error: ', error);
        throw error;
    }
};

export const updateUser = async (user_id, first_name, last_name, phone_number) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.USER+`${user_id}`, {first_name, last_name, phone_number});
        console.log('Update user response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Update user error: ', error);
        throw error;
    }
};
