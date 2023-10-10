"use client";
import { createContext, useState } from "react";

export const CartData = createContext(null);

export default function CartContext({ children }) {
  const [cartList, setCartList] = useState([]);
  return (
    <CartData.Provider value={(cartList, setCartList)}>
      {children}
    </CartData.Provider>
  );
}
