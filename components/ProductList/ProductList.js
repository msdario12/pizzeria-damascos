"use client";

import pizzas from "@/exampleData";
import ProductCard from "../ProductCard/ProductCard";
import useCartList from "@/hooks/useCartList";

export default function ProductList() {
  const { cartList, setCartList } = useCartList();

  const addOneItemToCart = (id, price) => {
    const foundedItemIndex = cartList.findIndex((el) => el.id === id);
    if (foundedItemIndex === -1) {
      // Item not found
      setCartList((prev) => [...prev, { id, count: 1, price }]);
      return;
    }
    setCartList((prev) =>
      prev.map((el, index) => {
        if (index === foundedItemIndex) {
          return { ...el, count: el.count + 1 };
        } else {
          return el;
        }
      }),
    );
    console.log(cartList);
  };
  const removeOneItemFromCart = (id) => {
    setCartList((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          return { ...el, count: el.count - 1 };
        } else {
          return el;
        }
      }),
    );
    console.log(cartList);
  };
  const defineCountOfItemToCart = (id, count, price) => {
    setCartList((prev) => [...prev, { id, count, price }]);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Lista de variedades</h1>
      <ProductCard />
      {pizzas.map((el) => (
        <ProductCard
          pizza={el}
          removeItem={removeOneItemFromCart}
          addItem={addOneItemToCart}
          defineItem={defineCountOfItemToCart}
        ></ProductCard>
      ))}
    </div>
  );
}
