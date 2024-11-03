import React, { useReducer, useEffect, useContext, useState } from "react";
import {
  getWishListByUser,
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../api/wishList";
import { AuthContext } from "../contexts/AuthContext";
import { SaveItemContext } from "../contexts/SaveItemContext";
import { initialStateReducer, saveItemReducer } from "../reducers/saveItemReducer";

export const SaveItemProvider = ({ children }) => {
  const [wishList, dispatch] = useReducer(saveItemReducer, initialStateReducer);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishListByUser(user.id);
        dispatch({ type: "SET_SAVED_ITEMS", payload: data.data });
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    if (user?.id) {
      fetchWishlist();
    }
  }, [user]);

  const addToWishlist = async (productId) => {
    try {
      const data = await addProductToWishlist(user.id, productId);
      dispatch({ type: "ADD_TO_SAVED_ITEMS", payload: data.data });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (wishlistItemId) => {
    try {
      const data = await removeProductFromWishlist(wishlistItemId);
      dispatch({ type: "REMOVE_FROM_SAVED_ITEMS", payload: data.data._id });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <SaveItemContext.Provider value={{ wishList, addToWishlist, removeFromWishlist }}>
      {children}
    </SaveItemContext.Provider>
  );
};
