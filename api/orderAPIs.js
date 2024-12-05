import axiosInstance from '../helpers/axios';
import { API_ENDPOINTS } from '../constants/endPoints';

export const createOrder = async (user_id, address, payment_method, orderDetails) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ORDER, { user_id, address, payment_method, orderDetails });
        console.log('Create order response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Create order error: ', error);
        throw error;
    }
};

export const createLinkPayment = async (order_id) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.PAYMENT, { order_id });
        console.log('Payment response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Payment error: ', error);
        throw error;
    }
};

export const getOrderByById = async (order_id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.ORDER + `${order_id}`);
        console.log('Get order by id response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Get order by id error: ', error);
        throw error;
    }
}

export const getOrderDetailsByUserId = async (user_id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.ORDERDETAILBYUSER + `${user_id}`);
        console.log('Get order by user id response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Get order by user id error: ', error);
        throw error;
    }
}

export const checkStatusOrder = async (app_trans_id) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ORDERSTATUS, { app_trans_id });
        console.log('Get status order response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Get status order error: ', error);
        throw error;
    }
}
