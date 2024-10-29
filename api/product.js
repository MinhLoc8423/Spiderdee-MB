import axiosInstance from '../helpers/axios';
import { API_ENDPOINTS } from '../constants/endpoints';

export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS);
        console.log('Products response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Products error: ', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS+`${id}`);
        console.log('Products by id response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Products by id error: ', error);
        throw error;
    }
};

export const searchProducts = async (name, category, min_price, max_price) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTSSEARCH+`?name=${name}&category=${category}&min_price=${min_price}&max_price=${max_price}`);
        console.log('Search products response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Search products error: ', error);
        throw error;
    }
};

