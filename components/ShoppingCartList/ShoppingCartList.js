"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCartList from "@/hooks/useCartList";

export default function ShoppingCartList() {
  const { cartList } = useCartList();
  return (
    <section>
      <h2>Lista de pedidos</h2>
      <div>
        <Table>
          <TableCaption>Lista de pedidos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead className="text-right">Sub-Total</TableHead>
            </TableRow>
          </TableHeader>
          {cartList.map((el) => (
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{el.name}</TableCell>
                <TableCell>{el.count}</TableCell>
                <TableCell className="text-right">
                  {el.price * el.count}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
    </section>
  );
}
