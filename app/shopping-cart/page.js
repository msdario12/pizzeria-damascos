"use client";
import DirectionForm from "@/components/DirectionForm/DirectionForm";
import { MapLazyComponent } from "@/components/DirectionMap/MapLazyComponent";
import ShoppingCartList from "@/components/ShoppingCartList/ShoppingCartList";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShoppingCartPage() {
  const searchParams = useSearchParams();
  const [cartList, setCartList] = useState([]);
  const [position, setPosition] = useState([
    -26.832724441173, -65.2174963397207,
  ]);
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
      <DirectionForm setPosition={setPosition} />
      <MapLazyComponent position={position} />
    </main>
  );
}
