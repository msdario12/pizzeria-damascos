"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import useCartList from "@/hooks/useCartList";
import Link from "next/link";



export default function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartList  } = useCartList();

  useEffect(() => {
    if (cartList) {
      setTotalPrice(
        cartList.reduce(
          (acc, current) => acc + current.price * current.count,
          0
        )
      );
    } else {
      setTotalPrice(0)
    }
  }, [cartList]);

  const generateCartUrl = (cartList) => {
    const searchParams = new URLSearchParams("");
    // searchParams.append("test", "prueba");
    // searchParams.append("list", cartList);
    if (cartList)
  {
    cartList.forEach((item, index) =>
      searchParams.append(index, JSON.stringify(item))
    );
    }
    return searchParams.toString();
  };

  return (
    <div className="fixed bottom-0 w-full left-0 z-10">
      <Card className="rounded">
        <CardContent className="flex justify-between items-center mt-5">
          <div>
            <h3 className="font text-xl">Total</h3>
            <span className="font-bold text-3xl">{"$ " + totalPrice}</span>
          </div>
          <Button>
            <Link href={"/shopping-cart?" + generateCartUrl(cartList)}>
              Realizar pedido
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
