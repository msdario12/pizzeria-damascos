"use client";
import CartContext, { CartData } from "@/context/cartContext";
import { useContext } from "react";

const useCartList = () => {
  return useContext(CartData);
};

export default useCartList;
