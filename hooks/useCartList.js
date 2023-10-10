"use client";
import CartContext from "@/context/cartContext";
import { useContext } from "react";

export default function useCartList() {
  const { cartList, setCartList } = useContext(CartContext);
  return { cartList, setCartList };
}
