import Cart from "@/components/Cart/Cart";
import ProductList from "@/components/ProductList/ProductList";
import ShoppingCartList from "@/components/ShoppingCartList/ShoppingCartList";
import CartContext from "@/context/cartContext";
export default function Home() {
  return (
    <CartContext>
      <main className="flex min-h-screen flex-col container  bg-black text-white relative mb-28">
        <section className="min-h-screen flex flex-col justify-center">
          <h1 className="text-3xl font-bold">Pizzeria Damasco</h1>
          <h3>Las mejores pizzas listas para hornear.</h3>
        </section>
        <section className="min-h-screen">
          <ProductList />
        </section>
        <aside>
          <Cart />
        </aside>
      </main>
    </CartContext>
  );
}
