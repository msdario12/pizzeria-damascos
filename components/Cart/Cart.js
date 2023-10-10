"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import pizzas from "@/exampleData";
import { getItemFromLS } from "@/lib/utils";
export default function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartList, setCartList] = useState([]);
  const local = getItemFromLS("cart");
  useEffect(() => {
    console.log(cartList);
    if (local.length === cartList.length) {
      return;
    }
    setCartList(local);
    // if (local) {
    //   local.forEach((item) => {
    //     const foundItem = pizzas.find((el) => el.id === item.id);
    //     setTotalPrice((prev) => prev + foundItem.price * item.count);
    //   });
  }, [local]);
  return (
    <div className="fixed bottom-4 w-full left-0 h-20">
      <Card className="">
        <CardContent className="flex justify-between items-center">
          <div>
            <h3>Total</h3>
            <span>{cartList.length}</span>
          </div>
          <Button>Realizar pedido</Button>
        </CardContent>
      </Card>
    </div>
  );
}
