import axiosInstance from '../helpers/axios';
import { API_ENDPOINTS } from '../constants/endPoints';

export const getWishListByUser = async (user_id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.WISHLISTGETUSER+`${user_id}`);
        console.log('WishList by user response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Products error: ', error);
        throw error;
    }
};

export const addProductToWishlist = async ( user_id, product_id ) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.WISHLIST, {  user_id, product_id });
        console.log('Create wishlist response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Create wishlist error: ', error);
        throw error;
    }
};

export const removeProductFromWishlist = async (wishlist_id) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.WISHLIST+`${wishlist_id}`);
        console.log('Remove wishlist response: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Remove wishlist error: ', error);
        throw error;
    }
};

