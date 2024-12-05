import axiosInstance from '../helpers/axios';
import { API_ENDPOINTS } from '../constants/endPoints';


export const getAddressByUser = async (user_id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.ADDRESS+`user/${user_id}`);
        console.log('Get address response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Get address error: ', error);
        throw error;
    }
};

export const createAddress = async (name, address, user_id, isDefault) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ADDRESS, { name, address, user_id, isDefault });
        console.log('Create address response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Create address error: ', error);
        throw error;
    }
};

export const updateAddressAPI = async (id, name, address, user_id, isDefault) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.ADDRESS + id, { name, address, isDefault, user_id });
        console.log('Update address response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Update address error: ', error);
        throw error;
    }
};

export const deleteAddressAPI = async (id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.ADDRESS + id);
        console.log('Delete address response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Delete address error: ', error);
        throw error;
    }
};