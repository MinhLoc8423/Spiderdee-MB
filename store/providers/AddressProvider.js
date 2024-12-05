// AddressProvider.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { addressReducer, initialAddress } from '../reducers/addressReducer';
import { getAddressByUser, createAddress, updateAddressAPI, deleteAddressAPI } from '../../api/addressAPIs';
import { AddressContext } from '../contexts/AddressContext';
import { AuthContext } from '../contexts/AuthContext';

export const AddressProvider = ({ children }) => {
    const [addresses, dispatch] = useReducer(addressReducer, initialAddress);
    const { user } = useContext(AuthContext);
    console.log(addresses); // Kiểm tra dữ liệu địa chỉ

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const data = await getAddressByUser(user.id);
                dispatch({ type: "LOAD_ADDRESSES", payload: data.data });
            } catch (error) {
                console.error("Error fetching addresses:", error.message);
            }
        };

        if (user?.id) {
            fetchAddresses();
        }
    }, [user]);

    const addAddress = async (name, address, defaultStatus = false) => {
        try {
            const data = await createAddress(name, address, user.id, defaultStatus);
            dispatch({
                type: "ADD_ADDRESS",
                payload: { ...data.data, isDefault: defaultStatus },
            });
        } catch (error) {
            console.error("Error adding address:", error?.message || error);
        }
    };

    const setDefaultAddress = (shipmentId) => {
        dispatch({ type: "SET_DEFAULT_ADDRESS", payload: { shipment_id: shipmentId } });
    };

    const updateAddress = async (id, name, address, isDefault) => {
        try {
            console.log("Updating address:", id, name, address, isDefault);
            const data = await updateAddressAPI(id, name, address, user.id, isDefault );
            console.log("Updated address:", data.data);
            dispatch({
                type: "UPDATE_ADDRESS",
                payload: { ...data.data, isDefault },
            });
        } catch (error) {
            console.error("Error updating address:", error?.message || error);
        }
    };

    const deleteAddress = async (id) => {
        try {
            const data = await deleteAddressAPI(id);
            console.log("Deleted address:", data.data);
            dispatch({ type: "DELETE_ADDRESS", payload: id });
        } catch (error) {
            console.error("Error deleting address:", error?.message || error);
        }
    };
    

    return (
        <AddressContext.Provider
            value={{
                addresses,
                addAddress,
                updateAddress,
                setDefaultAddress,
                deleteAddress,
            }}
        >
            {children}
        </AddressContext.Provider>
    );
};
