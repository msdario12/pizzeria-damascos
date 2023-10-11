"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import useCartList from "@/hooks/useCartList";
export default function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartList, setCartList } = useCartList();

  useEffect(() => {
    if (cartList.length > 0) {
      setTotalPrice(
        cartList.reduce(
          (acc, current) => acc + current.price * current.count,
          0,
        ),
      );
    }
  }, [cartList]);
  return (
    <div className="fixed bottom-4 w-full left-0 h-20">
      <Card className="">
        <CardContent className="flex justify-between items-center">
          <div>
            <h3>Total</h3>
            <span>{totalPrice}</span>
          </div>
          <Button>Realizar pedido</Button>
        </CardContent>
      </Card>
    </div>
  );
}
