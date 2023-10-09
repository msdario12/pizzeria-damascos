import ProductCard from "@/components/ProductCard/ProductCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col container  bg-black text-white">
      <section className="min-h-screen flex flex-col justify-center">
        <h1 className="text-3xl font-bold">Pizzeria Damasco</h1>
        <h3>Las mejores pizzas listas para hornear.</h3>
      </section>
      <section className="min-h-screen">
        <h1 className="text-3xl font-bold mb-5">Lista de variedades</h1>
        <ProductCard />
      </section>
    </main>
  );
}
