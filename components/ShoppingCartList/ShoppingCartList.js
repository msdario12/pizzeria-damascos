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

export default function ShoppingCartList({ cartList }) {
  // const { cartList } = useCartList();
  const totalPrice = cartList.reduce(
    (acc, curr) => acc + curr.count * curr.price,
    0
  );
  if (!cartList) {
    return "Sin datos";
  }
  return (
    <section>
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
          <TableBody>
            {cartList.map((el) => (
              <TableRow key={el.name + el.count}>
                <TableCell className="font-medium">{el.name}</TableCell>
                <TableCell>{el.count}</TableCell>
                <TableCell className="text-right">
                  {el.price * el.count}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="w-[100px]"></TableCell>
              <TableCell className="w-[100px]">Total: </TableCell>
              <TableCell className="w-[100px] text-right">
                {"$" + totalPrice}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
