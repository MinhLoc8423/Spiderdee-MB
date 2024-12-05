import axiosInstance from '../helpers/axios';
import { API_ENDPOINTS } from '../constants/endPoints';

export const getReviewsByOrderDetailIds = async (orderDetailIds) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.REVIEWORDERDETAIL, {orderDetailIds});
        console.log('Get reviews by order detail ids response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Get reviews by order detail ids error: ', error);
        throw error;
    }
}

export const getReviewByProductId = async (productId) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.REVIEWPRODUCT, {productId});
        console.log('Get review by product id response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Get review by product id error: ', error);
        throw error;
    }
};

export const createReview = async(comment, rating, product_id, user_id, order_detail_id) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.REVIEW, {comment, rating, product_id, user_id, order_detail_id});
        console.log('Create review response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Create review error: ', error);
        throw error;
    }
};
