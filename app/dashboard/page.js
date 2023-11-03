import { DataTable } from "./data-table";
import { columns } from "./columns";
import pizzas from "@/exampleData";
import NewPizzaForm from "./components/NewPizzaForm";
import dbPizzas from "@/utils/db/mongo-client";
import { Toaster } from "@/components/ui/toaster";
import AddNewPizza from "./components/AddNewPizza";
async function getData() {
  // Fetch data from API here
  try {
    const pizzas = await dbPizzas
      .collection("damascos-collection")
      .find({})
      .toArray();
    const result = pizzas.map((pizza) => {
      const newID = pizza._id.toString();
      return { ...pizza, _id: newID };
    });
    return result;
  } catch (e) {
    console.error(e);
  }
}

export default async function DashboardPage() {
  const data = await getData();
  return (
    <main>
      <h1 className="text-3xl">Cambia los productos a mostrar al público</h1>
      <AddNewPizza />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
      <Toaster />
    </main>
  );
}
