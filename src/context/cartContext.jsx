// src/context/cartContext.js

import axios from "axios";
import { createContext, useState } from "react";

const getAuthHeaders = () => ({
  token: localStorage.getItem("userToken"),
});

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartNumber, setCartNumber] = useState(0);

  async function addProductToCart(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers: getAuthHeaders() }
      );
      setCartNumber(response.data.numOfCartItems);
      return response;
    } catch (err) {
      return err;
    }
  }

  async function getProductToCart() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers: getAuthHeaders() }
      );
      setCartNumber(response.data.numOfCartItems);
      return response;
    } catch (err) {
      return err;
    }
  }

  async function updateProductInCart(productId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: getAuthHeaders() }
      );
      return response;
    } catch (err) {
      return err;
    }
  }

  async function deleteProductInCart(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: getAuthHeaders() }
      );
      setCartNumber(response.data.numOfCartItems);
      return response;
    } catch (err) {
      return err;
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getProductToCart,
        updateProductInCart,
        deleteProductInCart,
        cartNumber,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
