import React, { useReducer, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { initialCart, cartReducer } from "../reducers/cartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartProvider = ({ children }) => {
  const [cartList, dispatch] = useReducer(cartReducer, initialCart);

  const loadCartItems = async () => {
    const cart = await AsyncStorage.getItem("@Cart");
    if (cart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(cart) });
    }
  };

  useEffect(() => {
    loadCartItems(); 
  }, []); 

  useEffect(() => {
    const saveCartItems = async () => {
      try {
        await AsyncStorage.setItem("@Cart", JSON.stringify(cartList));
      } catch (error) {
        console.error("Failed to save cart items:", error);
      }
    };
    saveCartItems(); 
  }, [cartList]);

  const addToCart = (item, size) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...item, size } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { _id: id, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_FROM_CART" });
  };

  return (
    <CartContext.Provider value={{ cartList, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
