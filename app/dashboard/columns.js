"use client";
import { ColumnDef } from "@tanstack/react-table";

export const columns = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "description", header: "Descripción" },
  { accessorKey: "price", header: "Price" },
  {
    accessorKey: "img",
    header: "Imagen",
    cell: (row) => {
      return (
        <img
          src={
            row.row.original.img
              ? row.row.original.img
              : "https://placehold.co/200x200.png"
          }
          alt="Test"
        />
      );
    },
  },
];
