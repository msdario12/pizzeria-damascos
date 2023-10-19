"use client";
import DirectionForm from "@/components/DirectionForm/DirectionForm";
import ShoppingCartList from "@/components/ShoppingCartList/ShoppingCartList";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShoppingCartPage() {
  const searchParams = useSearchParams();
  const [cartList, setCartList] = useState([]);

  if (cartList.length === 0) {
    searchParams.forEach((item) =>
      setCartList((prev) => [...prev, JSON.parse(item)])
    );
  }
  return (
    <main className="min-h-screen lg:container ">
      <section>
        <h1>Revisa tu pedido</h1>
        {cartList && <ShoppingCartList cartList={cartList} />}
      </section>
      <Button>Realizar Pedidio</Button>
      <DirectionForm />
    </main>
  );
}
