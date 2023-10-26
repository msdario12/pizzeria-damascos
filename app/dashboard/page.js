import { DataTable } from "./data-table";
import { columns } from "./columns";
import pizzas from "@/exampleData";
async function getData() {
  // Fetch data from API here
  return [
    {
      name: "test",
      id: "2",
      description: "A nice test",
      img: "https://www.google.com",
    },
  ];
}

const examplePizzas = [
  {
    name: "Pizza 1",
    description: "Una linda pizzarda",
    price: 2200,
    img: "none",
  },
  {
    name: "Pizza 2",
    description: "Una casi buenarda pizzarda",
    price: 2800,
    img: "none",
  },
];

export default function DashboardPage() {
  return (
    <main>
      <h1 className="text-3xl">Cambia los productos a mostrar al público</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={pizzas} />
      </div>
    </main>
  );
}
