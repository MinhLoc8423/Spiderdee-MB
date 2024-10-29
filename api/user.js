import axiosInstance from "@/helpers/axios";
import { API_ENDPOINTS } from "@/constants/endpoints";

export const getUserById  = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.USERS+`${id}`);
        console.log("User response: ", response.data);
        return response.data;
    } catch (error) {
        console.log("User error: ", error);
        throw error;
    }
};